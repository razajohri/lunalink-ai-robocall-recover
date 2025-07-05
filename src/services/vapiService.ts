
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
}

class VapiService {
  private apiKey: string;
  private baseUrl = 'https://api.vapi.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getAssistant(assistantId: string): Promise<VapiAssistant> {
    return this.makeRequest(`/assistant/${assistantId}`);
  }

  async getCalls(assistantId?: string, limit = 100): Promise<VapiCall[]> {
    const params = new URLSearchParams();
    if (assistantId) params.append('assistantId', assistantId);
    params.append('limit', limit.toString());
    
    const response = await this.makeRequest(`/call?${params.toString()}`);
    return response.calls || [];
  }

  async getCall(callId: string): Promise<VapiCall> {
    return this.makeRequest(`/call/${callId}`);
  }

  async getStats(assistantId?: string): Promise<VapiStats> {
    const calls = await this.getCalls(assistantId);
    
    const totalCalls = calls.length;
    const completedCalls = calls.filter(call => call.status === 'ended');
    const totalDuration = completedCalls.reduce((sum, call) => sum + (call.duration || 0), 0);
    const totalCost = completedCalls.reduce((sum, call) => sum + (call.cost || 0), 0);
    
    // Calculate success rate based on call analysis or duration
    const successfulCalls = completedCalls.filter(call => 
      call.analysis?.successEvaluation === 'success' || 
      (call.duration && call.duration > 30) // Assume calls > 30s are successful
    );
    
    const successRate = totalCalls > 0 ? (successfulCalls.length / totalCalls) * 100 : 0;
    const averageDuration = completedCalls.length > 0 ? totalDuration / completedCalls.length : 0;

    return {
      totalCalls,
      totalDuration,
      totalCost,
      successRate,
      averageDuration
    };
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

export default VapiService;
