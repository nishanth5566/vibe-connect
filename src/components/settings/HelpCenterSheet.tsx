import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, ChevronRight, MessageCircle, Shield, MapPin, Heart, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  content: string;
}

interface HelpCenterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const helpArticles: HelpArticle[] = [
  {
    id: "1",
    title: "How to use the map",
    category: "Getting Started",
    icon: <MapPin className="w-5 h-5" />,
    content: "The map shows people nearby who share your vibes. Tap on a marker to see their profile and start a conversation."
  },
  {
    id: "2",
    title: "Managing your privacy",
    category: "Privacy & Safety",
    icon: <Shield className="w-5 h-5" />,
    content: "Control who can see your location and online status in Settings > Privacy. You can also block users from your profile."
  },
  {
    id: "3",
    title: "Matching with people",
    category: "Connections",
    icon: <Heart className="w-5 h-5" />,
    content: "Radius matches you with people who share similar vibes. The more vibes you select, the better your matches will be."
  },
  {
    id: "4",
    title: "Sending messages",
    category: "Chat",
    icon: <MessageCircle className="w-5 h-5" />,
    content: "Once matched, you can send messages through the Chats tab. Keep conversations respectful and follow our community guidelines."
  },
  {
    id: "5",
    title: "Account & billing",
    category: "Account",
    icon: <CreditCard className="w-5 h-5" />,
    content: "Manage your subscription and payment methods in Settings > Account. You can upgrade to Radius Premium for additional features."
  },
];

const HelpCenterSheet = ({ open, onOpenChange }: HelpCenterSheetProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  const filteredArticles = helpArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (selectedArticle) {
                  setSelectedArticle(null);
                } else {
                  onOpenChange(false);
                }
              }}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <SheetTitle className="text-xl font-bold">
              {selectedArticle ? selectedArticle.title : "Help Center"}
            </SheetTitle>
          </div>
        </SheetHeader>

        {selectedArticle ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-2 py-1 bg-secondary rounded-full">
                {selectedArticle.category}
              </span>
            </div>
            <p className="text-foreground leading-relaxed">{selectedArticle.content}</p>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Was this helpful?</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors">
                  Yes 👍
                </button>
                <button className="px-4 py-2 bg-secondary text-muted-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors">
                  No 👎
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl h-12 bg-secondary border-0"
              />
            </div>

            {/* Articles */}
            <div className="space-y-2">
              {filteredArticles.map((article, index) => (
                <motion.button
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedArticle(article)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
                    "bg-card hover:bg-secondary/50 text-left"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary">
                    {article.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{article.title}</p>
                    <p className="text-xs text-muted-foreground">{article.category}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              ))}

              {filteredArticles.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No articles found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HelpCenterSheet;
