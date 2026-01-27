import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'confirmed': 'bg-green-100 text-green-700 border-green-200',
    'pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'completed': 'bg-blue-100 text-blue-700 border-blue-200',
    'cancelled': 'bg-red-100 text-red-700 border-red-200',
    'active': 'bg-green-100 text-green-700 border-green-200',
    'blocked': 'bg-red-100 text-red-700 border-red-200',
    'open': 'bg-blue-100 text-blue-700 border-blue-200',
    'in-progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'resolved': 'bg-green-100 text-green-700 border-green-200',
    'done': 'bg-green-100 text-green-700 border-green-200',
    'todo': 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    'high': 'bg-red-100 text-red-700',
    'medium': 'bg-yellow-100 text-yellow-700',
    'low': 'bg-green-100 text-green-700',
  };
  return colors[priority] || 'bg-gray-100 text-gray-700';
}
