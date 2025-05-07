
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KnowledgeBase = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState([
    {
      id: "1",
      title: "Product Catalog",
      description: "Complete list of products with specifications and pricing",
      createdAt: "2023-05-15",
    },
    {
      id: "2",
      title: "Return Policy",
      description: "Details on our return and refund process",
      createdAt: "2023-06-02",
    },
    {
      id: "3",
      title: "Shipping Information",
      description: "Shipping methods, costs, and estimated delivery times",
      createdAt: "2023-06-10",
    },
  ]);

  const [newDocument, setNewDocument] = useState({
    title: "",
    description: "",
    content: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDocument = () => {
    if (newDocument.title.trim() === "" || newDocument.content.trim() === "") {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newDoc = {
      id: Date.now().toString(),
      title: newDocument.title,
      description: newDocument.description,
      content: newDocument.content,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setDocuments([...documents, newDoc]);
    setNewDocument({ title: "", description: "", content: "" });

    toast({
      title: "Success",
      description: "Knowledge base document added successfully",
    });
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast({
      title: "Success",
      description: "Document deleted successfully",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Manage your AI assistant's knowledge documents
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Knowledge Document</DialogTitle>
              <DialogDescription>
                Add documents to enhance your AI assistant's knowledge
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter document title"
                  value={newDocument.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description (optional)</label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter a brief description"
                  value={newDocument.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="content">Content</label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Enter document content"
                  className="h-40"
                  value={newDocument.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddDocument}>Save Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-semibold">{doc.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Added on {doc.createdAt}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{doc.description}</p>
              <div className="flex items-center mt-4 text-sm text-muted-foreground">
                <FileText className="h-4 w-4 mr-1" />
                <span>Document</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;
