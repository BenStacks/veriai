'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Gift, Sparkles, ExternalLink, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  nft?: {
    name: string;
    image?: string;
    price?: string;
    currency?: string;
    id?: string;
    transactionHash?: string;
  };
  type?: 'purchase' | 'verification' | 'general';
  actionButtons?: {
    primary?: {
      label: string;
      onClick: () => void;
      icon?: React.ReactNode;
    };
    secondary?: {
      label: string;
      onClick: () => void;
      icon?: React.ReactNode;
    };
  };
}

export function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  nft,
  type = 'general',
  actionButtons
}: SuccessModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'purchase':
        return {
          icon: Gift,
          color: 'from-chart-3 to-chart-3/70',
          accentColor: 'text-chart-3',
          bgColor: 'bg-chart-3/10'
        };
      case 'verification':
        return {
          icon: CheckCircle,
          color: 'from-primary to-accent',
          accentColor: 'text-primary',
          bgColor: 'bg-primary/10'
        };
      default:
        return {
          icon: CheckCircle,
          color: 'from-chart-3 to-chart-3/70',
          accentColor: 'text-chart-3',
          bgColor: 'bg-chart-3/10'
        };
    }
  };

  const typeConfig = getTypeConfig();
  const IconComponent = typeConfig.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="relative overflow-hidden border-2 border-border/50 bg-card/95 backdrop-blur">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${typeConfig.color} opacity-5`} />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-1 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="relative p-8">
                {/* Success Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  className="flex justify-center mb-6"
                >
                  <div className={`relative p-4 rounded-full bg-gradient-to-br ${typeConfig.color}`}>
                    <IconComponent className="h-8 w-8 text-white" />
                    {/* Sparkle Animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="h-4 w-4 text-chart-4" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                  <p className="text-muted-foreground">{message}</p>

                  {/* NFT Details */}
                  {nft && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`p-4 rounded-xl ${typeConfig.bgColor} border border-border/50`}
                    >
                      <div className="flex items-center gap-3">
                        {nft.image && (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Gift className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-foreground">{nft.name}</h3>
                          {nft.price && (
                            <p className="text-sm text-muted-foreground">
                              {nft.price} {nft.currency || 'SOL'}
                            </p>
                          )}
                          {nft.id && (
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                ID: {nft.id}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Transaction Hash */}
                      {nft.transactionHash && (
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Transaction:</span>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-background/50 px-2 py-1 rounded">
                                {nft.transactionHash.slice(0, 6)}...{nft.transactionHash.slice(-4)}
                              </code>
                              <button
                                onClick={() => copyToClipboard(nft.transactionHash!)}
                                className="p-1 hover:bg-background/50 rounded transition-colors"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => window.open(`https://explorer.solana.com/tx/${nft.transactionHash}`, '_blank')}
                                className="p-1 hover:bg-background/50 rounded transition-colors"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-3 mt-8"
                >
                  {actionButtons?.primary && (
                    <Button
                      onClick={actionButtons.primary.onClick}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                      size="lg"
                    >
                      {actionButtons.primary.icon}
                      {actionButtons.primary.label}
                    </Button>
                  )}
                  
                  {actionButtons?.secondary && (
                    <Button
                      onClick={actionButtons.secondary.onClick}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      {actionButtons.secondary.icon}
                      {actionButtons.secondary.label}
                    </Button>
                  )}
                  
                  {!actionButtons && (
                    <Button
                      onClick={onClose}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                      size="lg"
                    >
                      Continue
                    </Button>
                  )}
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
