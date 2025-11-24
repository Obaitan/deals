"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy, Check, Clock } from "lucide-react";
import { Coupon } from "@/types";
import { cn } from "@/lib/utils";

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-dashed border-2 border-emerald-100 hover:border-emerald-300 transition-colors bg-emerald-50/30">
      <CardContent className="px-5">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className="bg-white text-emerald-700 border-emerald-200">
            {coupon.store}
          </Badge>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Exp: {coupon.expiry}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-xl font-bold text-gray-900 mb-1">{coupon.discount}</div>
          <h3 className="font-medium text-gray-700 line-clamp-2 text-sm">{coupon.title}</h3>
        </div>

        <div className="relative px-3 py-1 bg-white rounded-lg border border-gray-200 flex items-center justify-between gap-3 group">
          <code className="font-mono font-bold text-emerald-700 text-lg tracking-wider">
            {coupon.type === "Code" ? coupon.code : "AUTOMATIC"}
          </code>
          {coupon.type === "Code" && (
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleCopy}
              className={cn(
                "h-8 px-2 transition-all",
                copied ? "text-green-600 bg-green-50" : "text-gray-400 hover:text-emerald-600"
              )}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </div>
         <div className="pt-3 pb-0">
        <Button 
          className="w-full bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={handleCopy}
          disabled={coupon.type === "Automatic"}
        >
          {coupon.type === "Code" ? (copied ? "Copied!" : "Copy Code") : "Get Deal"}
        </Button>
      </div>
      </CardContent>
    </Card>
  );
}
