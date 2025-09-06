'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'warning';
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

export function ErrorModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'error',
  actionButtons
}: ErrorModalProps) {
  const getTypeConfig = () => {
    switch (type) {
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'from-yellow-500 to-orange-500',
          accentColor: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'from-red-500 to-red-600',
          accentColor: 'text-red-500',
          bgColor: 'bg-red-500/10'
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
                {/* Error Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  className="flex justify-center mb-6"
                >
                  <div className={`relative p-4 rounded-full bg-gradient-to-br ${typeConfig.color}`}>
                    <IconComponent className="h-8 w-8 text-white" />
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
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 mt-8"
                >
                  {actionButtons?.primary && (
                    <Button
                      onClick={actionButtons.primary.onClick}
                      className="w-full"
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
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      Close
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
