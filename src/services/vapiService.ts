
export interface VapiCall {
  id: string;
  assistantId: string;
  customer: {
    number: string;
    name?: string;
    email?: string;
  };
  status: 'queued' | 'ringing' | 'in-progress' | 'forwarding' | 'ended';
  startedAt: string;
  endedAt?: string;
  duration?: number;
  cost?: number;
  transcript?: string;
  summary?: string;
  analysis?: {
    successEvaluation?: string;
    userSatisfactionRating?: number;
  };
  recordingUrl?: string;
}

export interface VapiAssistant {
  id: string;
  name: string;
  model: {
    provider: string;
    model: string;
  };
  voice: {
    provider: string;
    voiceId: string;
  };
  firstMessage: string;
  systemMessage: string;
  recordingEnabled: boolean;
  silenceTimeoutSeconds: number;
  maxDurationSeconds: number;
  backgroundSound: string;
  backchannelingEnabled: boolean;
  backgroundDenoisingEnabled: boolean;
  modelOutputInMessagesEnabled: boolean;
  transportConfigurations: any[];
  createdAt: string;
  updatedAt: string;
}

export interface VapiStats {
  totalCalls: number;
  totalDuration: number;
  totalCost: number;
  successRate: number;
  averageDuration: number;
  averageCost: number;
}

class VapiService {
  private apiKey: string;
  private baseUrl = 'https://api.vapi.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    console.log(`Making request to: ${this.baseUrl}${endpoint}`);
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Vapi API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Vapi API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data structure:', Object.keys(data));
    console.log('Full response data:', data);
    return data;
  }

  async getAssistant(assistantId: string): Promise<VapiAssistant> {
    return this.makeRequest(`/assistant/${assistantId}`);
  }

  async getCalls(assistantId?: string, limit = 100): Promise<VapiCall[]> {
    const params = new URLSearchParams();
    if (assistantId) params.append('assistantId', assistantId);
    params.append('limit', limit.toString());
    
    const response = await this.makeRequest(`/call?${params.toString()}`);
    
    // Handle different possible response structures
    let calls = [];
    if (Array.isArray(response)) {
      calls = response;
    } else if (response.calls && Array.isArray(response.calls)) {
      calls = response.calls;
    } else if (response.data && Array.isArray(response.data)) {
      calls = response.data;
    } else {
      console.warn('Unexpected response structure for calls:', response);
      calls = [];
    }
    
    console.log(`Retrieved ${calls.length} calls`);
    return calls;
  }

  async getCall(callId: string): Promise<VapiCall> {
    return this.makeRequest(`/call/${callId}`);
  }

  async getStats(assistantId?: string): Promise<VapiStats> {
    console.log('Fetching stats for assistant:', assistantId);
    const calls = await this.getCalls(assistantId, 1000); // Get more calls for better stats
    
    console.log('Processing stats from calls:', calls.length);
    
    if (calls.length === 0) {
      return {
        totalCalls: 0,
        totalDuration: 0,
        totalCost: 0,
        successRate: 0,
        averageDuration: 0,
        averageCost: 0
      };
    }
    
    const totalCalls = calls.length;
    const completedCalls = calls.filter(call => call.status === 'ended' && call.endedAt);
    
    console.log('Total calls:', totalCalls);
    console.log('Completed calls:', completedCalls.length);
    
    // Calculate total duration (convert from seconds to seconds, or handle if it's in different unit)
    const totalDuration = completedCalls.reduce((sum, call) => {
      const duration = call.duration || 0;
      console.log(`Call ${call.id} duration:`, duration);
      return sum + duration;
    }, 0);
    
    // Calculate total cost
    const totalCost = calls.reduce((sum, call) => {
      const cost = call.cost || 0;
      console.log(`Call ${call.id} cost:`, cost);
      return sum + cost;
    }, 0);
    
    // Calculate success rate based on call analysis or duration thresholds
    const successfulCalls = completedCalls.filter(call => {
      // Consider a call successful if:
      // 1. It has a success evaluation
      // 2. It lasted more than 10 seconds (indicating engagement)
      // 3. It has a transcript (indicating conversation happened)
      return call.analysis?.successEvaluation === 'success' || 
             (call.duration && call.duration > 10) ||
             (call.transcript && call.transcript.length > 50);
    });
    
    console.log('Successful calls:', successfulCalls.length);
    
    const successRate = totalCalls > 0 ? (successfulCalls.length / totalCalls) * 100 : 0;
    const averageDuration = completedCalls.length > 0 ? totalDuration / completedCalls.length : 0;
    const averageCost = totalCalls > 0 ? totalCost / totalCalls : 0;

    const stats = {
      totalCalls,
      totalDuration,
      totalCost,
      successRate,
      averageDuration,
      averageCost
    };
    
    console.log('Calculated stats:', stats);
    return stats;
  }

  formatDuration(seconds: number): string {
    if (!seconds || seconds === 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatCurrency(amount: number): string {
    if (!amount || amount === 0) return '$0.00';
    return `$${amount.toFixed(4)}`; // Vapi costs are often very small, so show more decimals
  }
}

export default VapiService;
