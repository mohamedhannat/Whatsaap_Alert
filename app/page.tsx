
// // 'use client';
// // import { useState, useEffect, useCallback } from 'react';
// // import { 
// //   Bell, Building2, Clock, Send, Plus, Trash2, CheckCircle, Eye, 
// //   RefreshCw, Shield, Camera, Activity, Settings, X, Loader2, 
// //   AlertTriangle, Zap, Phone, Globe, User, MessageCircle, Image,
// //   FileImage, Folder, Server, MapPin
// // } from 'lucide-react';

// // const API = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://dvzdg005z5.execute-api.us-east-1.amazonaws.com/prod';

// // interface Recipient {
// //   id: string;
// //   name: string;
// //   phone: string;
// //   countryCode: string;
// //   active: boolean;
// // }

// // interface AlertConfig {
// //   id: string;
// //   companyId: string;
// //   violationType: string;
// //   schedule: 'instant' | 'hourly' | 'daily';
// //   scheduledTime?: string;
// //   recipients: Recipient[];
// //   caption: string;
// //   active: boolean;
// //   lastSent?: string;
// //   sentCount: number;
// // }

// // interface Company {
// //   id: string;
// //   name: string;
// //   bucket: string;
// //   prefix: string;
// // }

// // interface S3Image {
// //   key: string;
// //   name: string;
// //   size: number;
// //   lastModified: string;
// // }

// // const VIOLATIONS = [
// //   { value: 'no_gloves', label: 'No Gloves', icon: '🧤' },
// //   { value: 'no_helmet', label: 'No Helmet', icon: '⛑️' },
// //   { value: 'no_safety_glasses', label: 'No Safety Glasses', icon: '🥽' },
// //   { value: 'blocking_emergency_equipment', label: 'Blocking Emergency', icon: '🚨' },
// //   { value: 'climbing_safety', label: 'Climbing Safety', icon: '🧗' },
// //   { value: 'height_safety', label: 'Height Safety', icon: '📏' },
// //   { value: 'poor_housekeeping', label: 'Poor Housekeeping', icon: '🧹' },
// //   { value: 'running', label: 'Running', icon: '🏃' },
// // ];

// // const COUNTRIES = [
// //   { code: '966', name: 'Saudi Arabia', flag: '🇸🇦' },
// //   { code: '971', name: 'UAE', flag: '🇦🇪' },
// //   { code: '973', name: 'Bahrain', flag: '🇧🇭' },
// //   { code: '974', name: 'Qatar', flag: '🇶🇦' },
// //   { code: '965', name: 'Kuwait', flag: '🇰🇼' },
// //   { code: '968', name: 'Oman', flag: '🇴🇲' },
// //   { code: '20', name: 'Egypt', flag: '🇪🇬' },
// //   { code: '962', name: 'Jordan', flag: '🇯🇴' },
// //   { code: '91', name: 'India', flag: '🇮🇳' },
// //   { code: '92', name: 'Pakistan', flag: '🇵🇰' },
// //   { code: '63', name: 'Philippines', flag: '🇵🇭' },
// //   { code: '880', name: 'Bangladesh', flag: '🇧🇩' },
// //   { code: '94', name: 'Sri Lanka', flag: '🇱🇰' },
// //   { code: '977', name: 'Nepal', flag: '🇳🇵' },
// //   { code: '1', name: 'USA/Canada', flag: '🇺🇸' },
// //   { code: '44', name: 'UK', flag: '🇬🇧' },
// // ];

// // async function api(path: string, options?: RequestInit) {
// //   try {
// //     const res = await fetch(`${API}${path}`, {
// //       ...options,
// //       headers: { 'Content-Type': 'application/json', ...options?.headers },
// //     });
// //     return await res.json();
// //   } catch (error) {
// //     console.error('API Error:', error);
// //     return { success: false, error: String(error) };
// //   }
// // }

// // export default function Dashboard() {
// //   const [companies, setCompanies] = useState<Company[]>([]);
// //   const [alerts, setAlerts] = useState<AlertConfig[]>([]);
// //   const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
// //   const [selectedAlert, setSelectedAlert] = useState<AlertConfig | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [sending, setSending] = useState<string | null>(null);
// //   const [saving, setSaving] = useState(false);
// //   const [time, setTime] = useState(new Date());
// //   const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
// //   const [showAddAlert, setShowAddAlert] = useState(false);
// //   const [showAddRecipient, setShowAddRecipient] = useState(false);
// //   const [showQuickTest, setShowQuickTest] = useState(false);
// //   const [quickTestResult, setQuickTestResult] = useState<any>(null);
// //   const [s3Images, setS3Images] = useState<S3Image[]>([]);
// //   const [loadingImages, setLoadingImages] = useState(false);
// //   const [systemStatus, setSystemStatus] = useState<any>(null);
  
// //   const [alertForm, setAlertForm] = useState({
// //     violationType: 'no_gloves',
// //     schedule: 'instant' as 'instant' | 'hourly' | 'daily',
// //     scheduledTime: '08:00',
// //     caption: '⚠️ PPE Violation - {violation}\n📍 Location: {location}\n🕐 Time: {timestamp}\n📸 Camera: {camera}'
// //   });
  
// //   const [recipientForm, setRecipientForm] = useState({
// //     name: '',
// //     phone: '',
// //     countryCode: '966'
// //   });

// //   const [quickTestForm, setQuickTestForm] = useState({
// //     countryCode: '966',
// //     phone: '',
// //     message: '🧪 FalconX Test Message\n\n✅ WhatsApp Integration Working!\n🦅 Safety Alert System',
// //     testType: 'text' as 'text' | 'image',
// //     bucket: 'aramco-cctv-monitoring-videos',
// //     s3Key: '',
// //     caption: ''
// //   });

// //   const notify = (type: 'success' | 'error', msg: string) => {
// //     setToast({ type, msg });
// //     setTimeout(() => setToast(null), 5000);
// //   };

// //   const loadCompanies = useCallback(async () => {
// //     const data = await api('/companies');
// //     if (data.success && data.data) {
// //       setCompanies(data.data);
// //       if (data.data.length > 0 && !selectedCompany) {
// //         setSelectedCompany(data.data[0]);
// //       }
// //     }
// //   }, [selectedCompany]);

// //   const loadAlerts = useCallback(async () => {
// //     if (!selectedCompany) return;
// //     const data = await api(`/alerts?companyId=${selectedCompany.id}`);
// //     if (data.success && data.data) {
// //       setAlerts(data.data);
// //       if (selectedAlert) {
// //         const updated = data.data.find((a: AlertConfig) => a.id === selectedAlert.id);
// //         if (updated) setSelectedAlert(updated);
// //       }
// //     }
// //   }, [selectedCompany, selectedAlert]);

// //   const loadStatus = async () => {
// //     const data = await api('/status');
// //     if (data.success) setSystemStatus(data);
// //   };

// //   const loadS3Images = async () => {
// //     setLoadingImages(true);
// //     const data = await api(`/images?bucket=${quickTestForm.bucket}`);
// //     if (data.success && data.images) setS3Images(data.images);
// //     setLoadingImages(false);
// //   };

// //   useEffect(() => {
// //     loadCompanies().finally(() => setLoading(false));
// //     loadStatus();
// //   }, [loadCompanies]);

// //   useEffect(() => {
// //     if (selectedCompany) loadAlerts();
// //   }, [selectedCompany, loadAlerts]);

// //   useEffect(() => {
// //     const t = setInterval(() => setTime(new Date()), 1000);
// //     return () => clearInterval(t);
// //   }, []);

// //   const createAlert = async () => {
// //     if (!selectedCompany) return;
// //     setSaving(true);
// //     const data = await api('/alerts', {
// //       method: 'POST',
// //       body: JSON.stringify({ companyId: selectedCompany.id, ...alertForm }),
// //     });
// //     if (data.success) {
// //       await loadAlerts();
// //       setShowAddAlert(false);
// //       notify('success', 'Alert created for ALL FLOORS - now add phone numbers');
// //     } else {
// //       notify('error', data.error || 'Failed');
// //     }
// //     setSaving(false);
// //   };

// //   const toggleAlert = async (a: AlertConfig) => {
// //     await api('/alerts', { method: 'PUT', body: JSON.stringify({ id: a.id, active: !a.active }) });
// //     setAlerts(alerts.map(x => x.id === a.id ? { ...x, active: !x.active } : x));
// //     notify('success', a.active ? 'Paused' : 'Activated');
// //   };

// //   const deleteAlert = async (id: string) => {
// //     if (!confirm('Delete this alert?')) return;
// //     await api(`/alerts?id=${id}`, { method: 'DELETE' });
// //     setAlerts(alerts.filter(a => a.id !== id));
// //     if (selectedAlert?.id === id) setSelectedAlert(null);
// //     notify('success', 'Deleted');
// //   };

// //   const addRecipient = async () => {
// //     if (!selectedAlert) return;
// //     if (!recipientForm.name.trim()) { notify('error', 'Enter name'); return; }
// //     if (!recipientForm.phone.trim() || recipientForm.phone.length < 7) { notify('error', 'Enter valid phone'); return; }
// //     setSaving(true);
// //     const data = await api('/recipients', {
// //       method: 'POST',
// //       body: JSON.stringify({
// //         alertId: selectedAlert.id,
// //         name: recipientForm.name.trim(),
// //         phone: recipientForm.phone.replace(/\D/g, ''),
// //         countryCode: recipientForm.countryCode,
// //       }),
// //     });
// //     if (data.success) {
// //       await loadAlerts();
// //       setShowAddRecipient(false);
// //       setRecipientForm({ name: '', phone: '', countryCode: '966' });
// //       notify('success', `Added: +${data.data.countryCode} ${data.data.phone}`);
// //     } else {
// //       notify('error', data.error || 'Failed');
// //     }
// //     setSaving(false);
// //   };

// //   const removeRecipient = async (rid: string) => {
// //     if (!selectedAlert || !confirm('Remove?')) return;
// //     await api(`/recipients?alertId=${selectedAlert.id}&recipientId=${rid}`, { method: 'DELETE' });
// //     await loadAlerts();
// //     notify('success', 'Removed');
// //   };

// //   const sendTest = async (alertId: string) => {
// //     const alert = alerts.find(a => a.id === alertId);
// //     if (!alert?.recipients?.length) { notify('error', 'Add phone numbers first'); return; }
// //     setSending(alertId);
// //     const data = await api('/send-test', { method: 'POST', body: JSON.stringify({ alertId }) });
// //     if (data.success) {
// //       notify('success', `Sent to ${data.sent || 0} number(s)`);
// //       loadAlerts();
// //     } else {
// //       notify('error', data.error || 'Failed to send');
// //     }
// //     setSending(null);
// //   };

// //   const sendQuickTest = async () => {
// //     if (!quickTestForm.phone.trim() || quickTestForm.phone.length < 7) {
// //       notify('error', 'Enter valid phone number');
// //       return;
// //     }
// //     setSaving(true);
// //     setQuickTestResult(null);
// //     let data;
// //     if (quickTestForm.testType === 'text') {
// //       data = await api('/quick-test', {
// //         method: 'POST',
// //         body: JSON.stringify({
// //           countryCode: quickTestForm.countryCode,
// //           phone: quickTestForm.phone.replace(/\D/g, ''),
// //           message: quickTestForm.message
// //         }),
// //       });
// //     } else {
// //       data = await api('/quick-test-image', {
// //         method: 'POST',
// //         body: JSON.stringify({
// //           countryCode: quickTestForm.countryCode,
// //           phone: quickTestForm.phone.replace(/\D/g, ''),
// //           bucket: quickTestForm.bucket,
// //           s3Key: quickTestForm.s3Key,
// //           caption: quickTestForm.caption
// //         }),
// //       });
// //     }
// //     setQuickTestResult(data);
// //     if (data.success) {
// //       notify('success', `✅ ${quickTestForm.testType === 'image' ? 'Image' : 'Message'} sent to ${data.phone}`);
// //     } else {
// //       notify('error', data.error || 'Failed to send');
// //     }
// //     setSaving(false);
// //   };

// //   const companyAlerts = alerts.filter(a => a.companyId === selectedCompany?.id);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
// //           <p className="text-slate-400">Connecting...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#0a0e1a] text-white">
// //       {toast && (
// //         <div className={`fixed top-4 right-4 z-50 px-5 py-4 rounded-xl flex items-center gap-3 shadow-2xl ${toast.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
// //           {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
// //           {toast.msg}
// //         </div>
// //       )}

// //       <header className="border-b border-slate-800 bg-[#0a0e1a]/95 backdrop-blur sticky top-0 z-40">
// //         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
// //               <Shield className="w-7 h-7" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold"><span className="text-blue-400">Nommas Whatsaap Managing</span>X</h1>
// //               <p className="text-xs text-slate-500">Safety Alert System</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <button onClick={() => { setShowQuickTest(true); loadS3Images(); }}
// //               className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition">
// //               <MessageCircle className="w-5 h-5" />
// //               <span className="hidden sm:inline">Quick Test</span>
// //             </button>
// //             <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${systemStatus?.whatsappStatus?.stateInstance === 'authorized' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
// //               <div className={`w-2 h-2 rounded-full ${systemStatus?.whatsappStatus?.stateInstance === 'authorized' ? 'bg-emerald-500' : 'bg-red-500'}`} />
// //               <span className={`text-sm ${systemStatus?.whatsappStatus?.stateInstance === 'authorized' ? 'text-emerald-400' : 'text-red-400'}`}>
// //                 {systemStatus?.greenApi?.instance || '...'}
// //               </span>
// //             </div>
// //             <div className="text-right">
// //               <div className="text-xs text-slate-500">Riyadh</div>
// //               <div className="text-xl font-mono text-blue-400">{time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Riyadh' })}</div>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
// //         <div className="col-span-12 lg:col-span-3">
// //           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl">
// //             <div className="p-4 border-b border-slate-800 flex items-center gap-2">
// //               <Building2 className="w-4 h-4 text-blue-400" />
// //               <span className="text-sm font-semibold text-slate-300 uppercase">Companies</span>
// //             </div>
// //             <div className="p-3">
// //               {companies.map(c => (
// //                 <button key={c.id} onClick={() => { setSelectedCompany(c); setSelectedAlert(null); }}
// //                   className={`w-full p-4 rounded-xl text-left mb-2 transition ${selectedCompany?.id === c.id ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-slate-800 border border-transparent'}`}>
// //                   <div className="flex items-center gap-3">
// //                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCompany?.id === c.id ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
// //                       <Building2 className="w-5 h-5" />
// //                     </div>
// //                     <div><div className="font-semibold">{c.name}</div><div className="text-xs text-slate-500 font-mono">{c.bucket}</div></div>
// //                   </div>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //           <div className="mt-4 grid grid-cols-2 gap-3">
// //             <div className="bg-[#0f1629] border border-slate-800 rounded-xl p-4">
// //               <Bell className="w-4 h-4 text-blue-400 mb-2" />
// //               <div className="text-2xl font-bold">{companyAlerts.reduce((s, a) => s + (a.sentCount || 0), 0)}</div>
// //               <div className="text-xs text-slate-500">Sent</div>
// //             </div>
// //             <div className="bg-[#0f1629] border border-slate-800 rounded-xl p-4">
// //               <CheckCircle className="w-4 h-4 text-emerald-400 mb-2" />
// //               <div className="text-2xl font-bold text-emerald-400">{companyAlerts.filter(a => a.active).length}</div>
// //               <div className="text-xs text-slate-500">Active</div>
// //             </div>
// //           </div>
// //           <div className="mt-4 bg-[#0f1629] border border-slate-800 rounded-xl p-4">
// //             <div className="flex items-center gap-2 mb-3">
// //               <Server className="w-4 h-4 text-emerald-400" />
// //               <span className="text-sm font-semibold text-slate-300">Green API</span>
// //             </div>
// //             <div className="space-y-2 text-sm">
// //               <div className="flex justify-between">
// //                 <span className="text-slate-500">Instance:</span>
// //                 <span className="text-emerald-400 font-mono">{systemStatus?.greenApi?.instance || '...'}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-slate-500">Status:</span>
// //                 <span className={systemStatus?.greenApi?.authorized ? 'text-emerald-400' : 'text-red-400'}>
// //                   {systemStatus?.whatsappStatus?.stateInstance || '...'}
// //                 </span>
// //               </div>
// //             </div>
// //             <button onClick={loadStatus} className="mt-3 w-full py-2 text-xs bg-slate-800 rounded-lg text-slate-400 hover:bg-slate-700">
// //               <RefreshCw className="w-3 h-3 inline mr-1" /> Refresh
// //             </button>
// //           </div>
// //         </div>

// //         <div className="col-span-12 lg:col-span-9">
// //           {selectedCompany ? (
// //             <>
// //               <div className="bg-gradient-to-r from-[#0f1629] to-[#111827] border border-slate-800 rounded-2xl p-6 mb-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
// //                     <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
// //                       <span className="flex items-center gap-1"><Camera className="w-4 h-4 text-blue-400" /><span className="font-mono">{selectedCompany.bucket}</span></span>
// //                       <span className="flex items-center gap-1 text-cyan-400"><MapPin className="w-4 h-4" />All Floors</span>
// //                     </div>
// //                   </div>
// //                   <button onClick={() => setShowAddAlert(true)}
// //                     className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:scale-105 transition">
// //                     <Plus className="w-5 h-5" />New Alert
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="bg-[#0f1629] border border-slate-800 rounded-2xl">
// //                 <div className="p-4 border-b border-slate-800 flex items-center gap-2">
// //                   <Settings className="w-4 h-4 text-blue-400" />
// //                   <span className="text-sm font-semibold text-slate-300 uppercase">Alert Configurations</span>
// //                   <span className="ml-2 px-2.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">{companyAlerts.length}</span>
// //                 </div>

// //                 {companyAlerts.length === 0 ? (
// //                   <div className="p-16 text-center">
// //                     <Bell className="w-16 h-16 text-slate-700 mx-auto mb-4" />
// //                     <p className="text-slate-500 mb-4">No alerts yet</p>
// //                     <button onClick={() => setShowAddAlert(true)} className="text-blue-400">Create first alert →</button>
// //                   </div>
// //                 ) : (
// //                   <div className="divide-y divide-slate-800">
// //                     {companyAlerts.map(alert => (
// //                       <div key={alert.id} className={`p-5 transition ${selectedAlert?.id === alert.id ? 'bg-blue-500/5' : 'hover:bg-slate-800/30'}`}>
// //                         <div className="flex items-start gap-4">
// //                           <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${alert.active ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
// //                             {VIOLATIONS.find(v => v.value === alert.violationType)?.icon || '⚠️'}
// //                           </div>
// //                           <div className="flex-1">
// //                             <div className="flex items-center gap-2 flex-wrap">
// //                               <span className="font-semibold text-lg">{VIOLATIONS.find(v => v.value === alert.violationType)?.label}</span>
// //                               <span className={`px-2.5 py-1 text-xs rounded-full ${alert.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
// //                                 {alert.active ? '● Active' : '○ Paused'}
// //                               </span>
// //                               <span className={`px-2.5 py-1 text-xs rounded-full ${alert.schedule === 'instant' ? 'bg-yellow-500/20 text-yellow-400' : alert.schedule === 'hourly' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
// //                                 {alert.schedule === 'instant' ? '⚡ Instant' : alert.schedule === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
// //                               </span>
// //                             </div>
// //                             <div className="flex items-center gap-4 mt-2 text-sm text-slate-400 flex-wrap">
// //                               <span className="flex items-center gap-1.5 text-cyan-400"><MapPin className="w-4 h-4" />All Floors</span>
// //                               <span className="flex items-center gap-1.5 text-blue-400 font-medium"><Phone className="w-4 h-4" />{(alert.recipients || []).length} number{(alert.recipients || []).length !== 1 ? 's' : ''}</span>
// //                               <span className="flex items-center gap-1.5"><Send className="w-4 h-4" />{alert.sentCount || 0} sent</span>
// //                             </div>
// //                           </div>
// //                           <div className="flex gap-1">
// //                             <button onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)} className={`p-2.5 rounded-lg ${selectedAlert?.id === alert.id ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-slate-800 text-slate-400'}`} title="View Details"><Eye className="w-5 h-5" /></button>
// //                             <button onClick={() => sendTest(alert.id)} disabled={sending === alert.id} className="p-2.5 hover:bg-emerald-500/20 rounded-lg text-emerald-400 disabled:opacity-50" title="Send Test">
// //                               {sending === alert.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
// //                             </button>
// //                             <button onClick={() => toggleAlert(alert)} className={`p-2.5 hover:bg-slate-800 rounded-lg ${alert.active ? 'text-emerald-400' : 'text-slate-400'}`} title={alert.active ? 'Pause' : 'Activate'}>
// //                               {alert.active ? <RefreshCw className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
// //                             </button>
// //                             <button onClick={() => deleteAlert(alert.id)} className="p-2.5 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400" title="Delete"><Trash2 className="w-5 h-5" /></button>
// //                           </div>
// //                         </div>

// //                         {selectedAlert?.id === alert.id && (
// //                           <div className="mt-6 pt-6 border-t border-slate-800">
// //                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                               <div>
// //                                 <h4 className="text-sm text-slate-400 mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-blue-400" />Message Template</h4>
// //                                 <div className="p-4 bg-[#0a0e1a] rounded-xl font-mono text-sm whitespace-pre-wrap border border-slate-800">{alert.caption}</div>
// //                                 <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
// //                                   <div className="flex items-center gap-2 text-cyan-400 text-sm">
// //                                     <MapPin className="w-4 h-4" />
// //                                     <span className="font-semibold">Triggers on ALL floors</span>
// //                                   </div>
// //                                   <p className="text-xs text-slate-400 mt-1">Location will be auto-detected from S3 path</p>
// //                                 </div>
// //                               </div>
// //                               <div>
// //                                 <div className="flex items-center justify-between mb-3">
// //                                   <h4 className="text-sm text-slate-400 flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" />Phone Numbers</h4>
// //                                   <button onClick={() => setShowAddRecipient(true)} className="flex items-center gap-1.5 text-sm text-blue-400 px-3 py-1.5 bg-blue-500/10 rounded-lg hover:bg-blue-500/20">
// //                                     <Plus className="w-4 h-4" />Add
// //                                   </button>
// //                                 </div>
// //                                 <div className="space-y-2 max-h-52 overflow-y-auto">
// //                                   {(alert.recipients || []).length > 0 ? (
// //                                     alert.recipients.map(r => (
// //                                       <div key={r.id} className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-xl border border-slate-800 group hover:border-slate-700">
// //                                         <div className="flex items-center gap-3">
// //                                           <div className="w-3 h-3 rounded-full bg-emerald-500" />
// //                                           <div>
// //                                             <div className="flex items-center gap-2"><User className="w-4 h-4 text-slate-500" /><span className="font-medium">{r.name}</span></div>
// //                                             <div className="flex items-center gap-2 mt-1">
// //                                               <span className="text-blue-400 font-mono">+{r.countryCode} {r.phone}</span>
// //                                               <span className="text-xs">{COUNTRIES.find(c => c.code === r.countryCode)?.flag}</span>
// //                                             </div>
// //                                           </div>
// //                                         </div>
// //                                         <button onClick={() => removeRecipient(r.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100"><X className="w-4 h-4" /></button>
// //                                       </div>
// //                                     ))
// //                                   ) : (
// //                                     <div className="text-center py-8 bg-[#0a0e1a] rounded-xl border border-dashed border-slate-700">
// //                                       <Phone className="w-8 h-8 text-slate-700 mx-auto mb-2" />
// //                                       <p className="text-sm text-slate-500">No numbers added</p>
// //                                       <button onClick={() => setShowAddRecipient(true)} className="text-blue-400 text-sm mt-2">Add first →</button>
// //                                     </div>
// //                                   )}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                             <div className="mt-6 p-4 bg-[#0a0e1a] rounded-xl border border-slate-800">
// //                               <div className="text-xs text-slate-500 mb-2">S3 Trigger Path (all locations)</div>
// //                               <code className="text-sm text-cyan-400 font-mono">s3://{selectedCompany.bucket}/ppe/ppe/*/{ alert.violationType}/YYYY-MM-DD/*.jpg</code>
// //                             </div>
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </>
// //           ) : (
// //             <div className="flex items-center justify-center h-96 bg-[#0f1629] border border-slate-800 rounded-2xl">
// //               <div className="text-center"><Building2 className="w-16 h-16 text-slate-700 mx-auto mb-4" /><p className="text-slate-500">Select a company</p></div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Add Alert Modal - NO LOCATION FIELD */}
// //       {showAddAlert && (
// //         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
// //           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-xl font-bold">New Alert</h3>
// //               <button onClick={() => setShowAddAlert(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
// //             </div>
// //             <div className="space-y-5">
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block">Violation Type</label>
// //                 <select value={alertForm.violationType} onChange={e => setAlertForm({ ...alertForm, violationType: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">
// //                   {VIOLATIONS.map(v => <option key={v.value} value={v.value}>{v.icon} {v.label}</option>)}
// //                 </select>
// //               </div>
              
// //               {/* ALL FLOORS INFO */}
// //               <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
// //                 <div className="flex items-center gap-2 text-cyan-400">
// //                   <MapPin className="w-5 h-5" />
// //                   <span className="font-semibold">All Floors</span>
// //                 </div>
// //                 <p className="text-sm text-slate-400 mt-2">This alert will trigger for this violation type on ANY floor. The actual location will be auto-detected from the image path.</p>
// //               </div>
              
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block">Schedule</label>
// //                 <div className="grid grid-cols-3 gap-3">
// //                   {(['instant', 'hourly', 'daily'] as const).map(s => (
// //                     <button key={s} onClick={() => setAlertForm({ ...alertForm, schedule: s })} className={`p-4 rounded-xl border text-sm font-medium ${alertForm.schedule === s ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-400 hover:border-slate-600'}`}>
// //                       {s === 'instant' ? '⚡ Instant' : s === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
// //                     </button>
// //                   ))}
// //                 </div>
// //                 <p className="text-xs text-slate-500 mt-2">
// //                   {alertForm.schedule === 'instant' && '⚡ Sends immediately when S3 receives new violation image'}
// //                   {alertForm.schedule === 'hourly' && '🕐 Sends summary every hour via EventBridge'}
// //                   {alertForm.schedule === 'daily' && '📅 Sends daily report at scheduled time'}
// //                 </p>
// //               </div>
// //               {alertForm.schedule === 'daily' && (
// //                 <div>
// //                   <label className="text-sm text-slate-400 mb-2 block">Time</label>
// //                   <input type="time" value={alertForm.scheduledTime} onChange={e => setAlertForm({ ...alertForm, scheduledTime: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white" />
// //                 </div>
// //               )}
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block">Caption</label>
// //                 <textarea value={alertForm.caption} onChange={e => setAlertForm({ ...alertForm, caption: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono text-sm resize-none" />
// //                 <p className="text-xs text-slate-500 mt-2">Variables: {'{violation}'}, {'{location}'}, {'{timestamp}'}, {'{camera}'}</p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3 mt-6">
// //               <button onClick={() => setShowAddAlert(false)} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
// //               <button onClick={createAlert} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
// //                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}Create
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Add Phone Number Modal */}
// //       {showAddRecipient && selectedAlert && (
// //         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
// //           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-md p-6">
// //             <div className="flex items-center justify-between mb-6">
// //               <div>
// //                 <h3 className="text-xl font-bold">Add Phone Number</h3>
// //                 <p className="text-sm text-slate-500 mt-1">WhatsApp recipient</p>
// //               </div>
// //               <button onClick={() => setShowAddRecipient(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
// //             </div>
// //             <div className="space-y-5">
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block"><User className="w-4 h-4 inline mr-2" />Name *</label>
// //                 <input type="text" value={recipientForm.name} onChange={e => setRecipientForm({ ...recipientForm, name: e.target.value })} placeholder="Safety Manager" className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white" />
// //               </div>
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block"><Globe className="w-4 h-4 inline mr-2" />Country *</label>
// //                 <select value={recipientForm.countryCode} onChange={e => setRecipientForm({ ...recipientForm, countryCode: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">
// //                   {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} +{c.code} — {c.name}</option>)}
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block"><Phone className="w-4 h-4 inline mr-2" />Phone Number *</label>
// //                 <div className="flex">
// //                   <div className="px-4 py-3 bg-slate-800 border border-slate-800 rounded-l-xl text-blue-400 font-mono flex items-center gap-2">
// //                     <span>{COUNTRIES.find(c => c.code === recipientForm.countryCode)?.flag}</span>
// //                     <span>+{recipientForm.countryCode}</span>
// //                   </div>
// //                   <input type="tel" value={recipientForm.phone} onChange={e => setRecipientForm({ ...recipientForm, phone: e.target.value.replace(/\D/g, '') })} placeholder="545974262" className="flex-1 px-4 py-3 bg-[#0a0e1a] border border-slate-800 border-l-0 rounded-r-xl text-white font-mono" />
// //                 </div>
// //               </div>
// //               {recipientForm.phone && (
// //                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
// //                   <div className="text-xs text-emerald-400 mb-1">Preview:</div>
// //                   <div className="text-lg font-mono text-white">{COUNTRIES.find(c => c.code === recipientForm.countryCode)?.flag} +{recipientForm.countryCode} {recipientForm.phone}</div>
// //                 </div>
// //               )}
// //             </div>
// //             <div className="flex gap-3 mt-6">
// //               <button onClick={() => setShowAddRecipient(false)} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
// //               <button onClick={addRecipient} disabled={saving || !recipientForm.name || !recipientForm.phone} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
// //                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Phone className="w-5 h-5" />}Add
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Quick Test Modal */}
// //       {showQuickTest && (
// //         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
// //           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
// //             <div className="flex items-center justify-between mb-6">
// //               <div>
// //                 <h3 className="text-xl font-bold flex items-center gap-2"><MessageCircle className="w-6 h-6 text-emerald-400" />Quick Test</h3>
// //                 <p className="text-sm text-slate-500 mt-1">Instance: <span className="text-emerald-400 font-mono">{systemStatus?.greenApi?.instance || '...'}</span></p>
// //               </div>
// //               <button onClick={() => { setShowQuickTest(false); setQuickTestResult(null); }} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
// //             </div>
// //             <div className="flex gap-2 mb-6">
// //               <button onClick={() => setQuickTestForm({ ...quickTestForm, testType: 'text' })} className={`flex-1 py-3 rounded-xl border font-medium flex items-center justify-center gap-2 ${quickTestForm.testType === 'text' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 text-slate-400'}`}>
// //                 <MessageCircle className="w-5 h-5" /> Text
// //               </button>
// //               <button onClick={() => setQuickTestForm({ ...quickTestForm, testType: 'image' })} className={`flex-1 py-3 rounded-xl border font-medium flex items-center justify-center gap-2 ${quickTestForm.testType === 'image' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-400'}`}>
// //                 <Image className="w-5 h-5" /> Image
// //               </button>
// //             </div>
// //             <div className="space-y-5">
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block"><Globe className="w-4 h-4 inline mr-2" />Country</label>
// //                 <select value={quickTestForm.countryCode} onChange={e => setQuickTestForm({ ...quickTestForm, countryCode: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">
// //                   {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} +{c.code} — {c.name}</option>)}
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="text-sm text-slate-400 mb-2 block"><Phone className="w-4 h-4 inline mr-2" />Phone</label>
// //                 <div className="flex">
// //                   <div className="px-4 py-3 bg-slate-800 rounded-l-xl text-emerald-400 font-mono flex items-center gap-2">
// //                     <span>{COUNTRIES.find(c => c.code === quickTestForm.countryCode)?.flag}</span>+{quickTestForm.countryCode}
// //                   </div>
// //                   <input type="tel" value={quickTestForm.phone} onChange={e => setQuickTestForm({ ...quickTestForm, phone: e.target.value.replace(/\D/g, '') })} placeholder="545974262" className="flex-1 px-4 py-3 bg-[#0a0e1a] border border-slate-800 border-l-0 rounded-r-xl text-white font-mono" />
// //                 </div>
// //               </div>
// //               {quickTestForm.testType === 'text' && (
// //                 <div>
// //                   <label className="text-sm text-slate-400 mb-2 block">Message</label>
// //                   <textarea value={quickTestForm.message} onChange={e => setQuickTestForm({ ...quickTestForm, message: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono text-sm resize-none" />
// //                 </div>
// //               )}
// //               {quickTestForm.testType === 'image' && (
// //                 <>
// //                   <div>
// //                     <label className="text-sm text-slate-400 mb-2 block"><Folder className="w-4 h-4 inline mr-2" />S3 Bucket</label>
// //                     <input type="text" value={quickTestForm.bucket} onChange={e => setQuickTestForm({ ...quickTestForm, bucket: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono" />
// //                   </div>
// //                   <div>
// //                     <div className="flex items-center justify-between mb-2">
// //                       <label className="text-sm text-slate-400"><FileImage className="w-4 h-4 inline mr-2" />Select Image</label>
// //                       <button onClick={loadS3Images} disabled={loadingImages} className="text-xs text-blue-400">{loadingImages ? <Loader2 className="w-4 h-4 animate-spin" /> : '↻ Refresh'}</button>
// //                     </div>
// //                     {s3Images.length > 0 ? (
// //                       <div className="max-h-48 overflow-y-auto bg-[#0a0e1a] border border-slate-800 rounded-xl">
// //                         {s3Images.map((img, idx) => (
// //                           <button key={idx} onClick={() => setQuickTestForm({ ...quickTestForm, s3Key: img.key })} className={`w-full px-4 py-3 text-left border-b border-slate-800 last:border-0 hover:bg-slate-800 ${quickTestForm.s3Key === img.key ? 'bg-blue-500/20' : ''}`}>
// //                             <div className="flex items-center gap-3">
// //                               <FileImage className={`w-5 h-5 ${quickTestForm.s3Key === img.key ? 'text-blue-400' : 'text-slate-500'}`} />
// //                               <div className="flex-1 min-w-0">
// //                                 <div className="text-sm font-mono truncate">{img.name}</div>
// //                                 <div className="text-xs text-slate-500">{(img.size / 1024).toFixed(1)} KB</div>
// //                               </div>
// //                               {quickTestForm.s3Key === img.key && <CheckCircle className="w-5 h-5 text-blue-400" />}
// //                             </div>
// //                           </button>
// //                         ))}
// //                       </div>
// //                     ) : (
// //                       <div className="p-8 bg-[#0a0e1a] border border-slate-800 rounded-xl text-center">
// //                         <FileImage className="w-8 h-8 text-slate-700 mx-auto mb-2" />
// //                         <p className="text-sm text-slate-500">{loadingImages ? 'Loading...' : 'No images'}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </>
// //               )}
// //               {quickTestResult && (
// //                 <div className={`p-4 rounded-xl border ${quickTestResult.success ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
// //                   <div className={`text-sm font-semibold mb-2 ${quickTestResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
// //                     {quickTestResult.success ? '✅ Sent!' : '❌ Failed'}
// //                   </div>
// //                   <details className="text-xs text-slate-500">
// //                     <summary className="cursor-pointer">Details</summary>
// //                     <pre className="mt-2 p-2 bg-black/30 rounded overflow-auto max-h-32">{JSON.stringify(quickTestResult, null, 2)}</pre>
// //                   </details>
// //                 </div>
// //               )}
// //             </div>
// //             <div className="flex gap-3 mt-6">
// //               <button onClick={() => { setShowQuickTest(false); setQuickTestResult(null); }} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
// //               <button onClick={sendQuickTest} disabled={saving || !quickTestForm.phone} className={`flex-1 py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2 ${quickTestForm.testType === 'image' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'}`}>
// //                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}Send
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// 'use client';
// import { useState, useEffect } from 'react';
// import { 
//   Bell, Building2, Send, Plus, Trash2, CheckCircle, 
//   RefreshCw, Shield, Camera, Settings, X, Loader2, 
//   AlertTriangle, Zap, Phone, Globe, User, MessageCircle, Image,
//   FileImage, Server, MapPin, Save, Edit3
// } from 'lucide-react';

// const API = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://dvzdg005z5.execute-api.us-east-1.amazonaws.com/prod';

// interface Recipient { id: string; name: string; phone: string; countryCode: string; active: boolean; }
// interface AlertConfig { id: string; companyId: string; violationType: string; schedule: 'instant' | 'hourly' | 'daily'; scheduledTime?: string; recipients: Recipient[]; caption: string; active: boolean; lastSent?: string; sentCount: number; }
// interface Company { id: string; name: string; bucket: string; prefix: string; }
// interface S3Image { key: string; name: string; size: number; lastModified: string; }

// const VIOLATIONS = [
//   { value: 'no_gloves', label: 'No Gloves', icon: '🧤' },
//   { value: 'no_helmet', label: 'No Helmet', icon: '⛑️' },
//   { value: 'no_safety_glasses', label: 'No Safety Glasses', icon: '🥽' },
//   { value: 'blocking_emergency_equipment', label: 'Blocking Emergency', icon: '🚨' },
//   { value: 'climbing_safety', label: 'Climbing Safety', icon: '🧗' },
//   { value: 'height_safety', label: 'Height Safety', icon: '📏' },
//   { value: 'poor_housekeeping', label: 'Poor Housekeeping', icon: '🧹' },
//   { value: 'running', label: 'Running', icon: '🏃' },
// ];

// const COUNTRIES = [
//   { code: '966', name: 'Saudi Arabia', flag: '🇸🇦' },
//   { code: '971', name: 'UAE', flag: '🇦🇪' },
//   { code: '973', name: 'Bahrain', flag: '🇧🇭' },
//   { code: '974', name: 'Qatar', flag: '🇶🇦' },
//   { code: '965', name: 'Kuwait', flag: '🇰🇼' },
//   { code: '968', name: 'Oman', flag: '🇴🇲' },
//   { code: '20', name: 'Egypt', flag: '🇪🇬' },
//   { code: '962', name: 'Jordan', flag: '🇯🇴' },
//   { code: '91', name: 'India', flag: '🇮🇳' },
//   { code: '92', name: 'Pakistan', flag: '🇵🇰' },
//   { code: '63', name: 'Philippines', flag: '🇵🇭' },
//   { code: '880', name: 'Bangladesh', flag: '🇧🇩' },
//   { code: '94', name: 'Sri Lanka', flag: '🇱🇰' },
//   { code: '977', name: 'Nepal', flag: '🇳🇵' },
//   { code: '1', name: 'USA/Canada', flag: '🇺🇸' },
//   { code: '44', name: 'UK', flag: '🇬🇧' },
// ];

// async function api(path: string, options?: RequestInit) {
//   try {
//     const res = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options?.headers } });
//     return await res.json();
//   } catch (error) {
//     return { success: false, error: String(error) };
//   }
// }

// export default function Dashboard() {
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [alerts, setAlerts] = useState<AlertConfig[]>([]);
//   const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
//   const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);
  
//   // SEPARATE edit form state - completely independent from alerts list
//   const [editViolationType, setEditViolationType] = useState('');
//   const [editSchedule, setEditSchedule] = useState<'instant' | 'hourly' | 'daily'>('instant');
//   const [editScheduledTime, setEditScheduledTime] = useState('08:00');
//   const [editCaption, setEditCaption] = useState('');
//   const [editRecipients, setEditRecipients] = useState<Recipient[]>([]);
//   const [hasChanges, setHasChanges] = useState(false);
  
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [time, setTime] = useState(new Date());
//   const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
//   const [showAddAlert, setShowAddAlert] = useState(false);
//   const [showAddRecipient, setShowAddRecipient] = useState(false);
//   const [showQuickTest, setShowQuickTest] = useState(false);
//   const [quickTestResult, setQuickTestResult] = useState<any>(null);
//   const [s3Images, setS3Images] = useState<S3Image[]>([]);
//   const [loadingImages, setLoadingImages] = useState(false);
//   const [systemStatus, setSystemStatus] = useState<any>(null);
  
//   const [alertForm, setAlertForm] = useState({
//     violationType: 'no_gloves',
//     schedule: 'instant' as 'instant' | 'hourly' | 'daily',
//     scheduledTime: '08:00',
//     caption: '⚠️ PPE Violation: {violation}\n📍 Location: {location}\n🕐 Time: {timestamp}\n📸 Camera: {camera}'
//   });
  
//   const [recipientForm, setRecipientForm] = useState({ name: '', phone: '', countryCode: '966' });
//   const [quickTestForm, setQuickTestForm] = useState({
//     countryCode: '966', phone: '', message: '🧪 FalconX Test\n✅ Working!\n🦅 Safety Alert System',
//     testType: 'text' as 'text' | 'image', bucket: 'aramco-cctv-monitoring-videos', s3Key: '', caption: ''
//   });

//   const notify = (type: 'success' | 'error', msg: string) => {
//     setToast({ type, msg });
//     setTimeout(() => setToast(null), 4000);
//   };

//   const loadCompanies = async () => {
//     const data = await api('/companies');
//     if (data.success && data.data) {
//       setCompanies(data.data);
//       if (data.data.length > 0) setSelectedCompany(data.data[0]);
//     }
//   };

//   const loadAlerts = async (companyId: string) => {
//     const data = await api(`/alerts?companyId=${companyId}`);
//     if (data.success && data.data) {
//       setAlerts(data.data);
//     }
//   };

//   const loadStatus = async () => {
//     const data = await api('/status');
//     if (data.success) setSystemStatus(data);
//   };

//   const loadS3Images = async () => {
//     setLoadingImages(true);
//     const data = await api(`/images?bucket=${quickTestForm.bucket}`);
//     if (data.success && data.images) setS3Images(data.images);
//     setLoadingImages(false);
//   };

//   useEffect(() => {
//     loadCompanies().finally(() => setLoading(false));
//     loadStatus();
//   }, []);

//   useEffect(() => {
//     if (selectedCompany) loadAlerts(selectedCompany.id);
//   }, [selectedCompany]);

//   useEffect(() => {
//     const t = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   const createAlert = async () => {
//     if (!selectedCompany) return;
//     setSaving(true);
//     const data = await api('/alerts', { method: 'POST', body: JSON.stringify({ companyId: selectedCompany.id, ...alertForm }) });
//     if (data.success) {
//       await loadAlerts(selectedCompany.id);
//       setShowAddAlert(false);
//       notify('success', 'Alert created!');
//     } else notify('error', data.error || 'Failed');
//     setSaving(false);
//   };

//   // Open edit panel and load values into separate state
//   const openEditPanel = (alert: AlertConfig) => {
//     if (expandedAlertId === alert.id) {
//       setExpandedAlertId(null);
//       setHasChanges(false);
//     } else {
//       setExpandedAlertId(alert.id);
//       // Load into SEPARATE state variables
//       setEditViolationType(alert.violationType);
//       setEditSchedule(alert.schedule);
//       setEditScheduledTime(alert.scheduledTime || '08:00');
//       setEditCaption(alert.caption);
//       setEditRecipients(alert.recipients || []);
//       setHasChanges(false);
//     }
//   };

//   const saveAlert = async () => {
//     if (!expandedAlertId) return;
//     setSaving(true);
//     const data = await api('/alerts', { 
//       method: 'PUT', 
//       body: JSON.stringify({
//         id: expandedAlertId,
//         violationType: editViolationType,
//         schedule: editSchedule,
//         scheduledTime: editScheduledTime,
//         caption: editCaption
//       }) 
//     });
//     if (data.success) {
//       // Update local alerts list
//       setAlerts(alerts.map(a => a.id === expandedAlertId ? {
//         ...a,
//         violationType: editViolationType,
//         schedule: editSchedule,
//         scheduledTime: editScheduledTime,
//         caption: editCaption
//       } : a));
//       setHasChanges(false);
//       notify('success', '✅ Alert saved!');
//     } else notify('error', data.error || 'Failed to save');
//     setSaving(false);
//   };

//   const toggleAlert = async (alert: AlertConfig) => {
//     const newActive = !alert.active;
//     await api('/alerts', { method: 'PUT', body: JSON.stringify({ id: alert.id, active: newActive }) });
//     setAlerts(alerts.map(a => a.id === alert.id ? { ...a, active: newActive } : a));
//     notify('success', newActive ? 'Activated' : 'Paused');
//   };

//   const deleteAlert = async (id: string) => {
//     if (!confirm('Delete this alert?')) return;
//     await api(`/alerts?id=${id}`, { method: 'DELETE' });
//     setAlerts(alerts.filter(a => a.id !== id));
//     if (expandedAlertId === id) setExpandedAlertId(null);
//     notify('success', 'Deleted');
//   };

//   const addRecipient = async () => {
//     if (!expandedAlertId) return;
//     if (!recipientForm.name.trim() || recipientForm.phone.length < 7) {
//       notify('error', 'Enter name and valid phone');
//       return;
//     }
//     setSaving(true);
//     const data = await api('/recipients', {
//       method: 'POST',
//       body: JSON.stringify({
//         alertId: expandedAlertId,
//         name: recipientForm.name.trim(),
//         phone: recipientForm.phone.replace(/\D/g, ''),
//         countryCode: recipientForm.countryCode
//       }),
//     });
//     if (data.success) {
//       const newRecipient = data.data;
//       setEditRecipients([...editRecipients, newRecipient]);
//       setAlerts(alerts.map(a => a.id === expandedAlertId ? { ...a, recipients: [...(a.recipients || []), newRecipient] } : a));
//       setShowAddRecipient(false);
//       setRecipientForm({ name: '', phone: '', countryCode: '966' });
//       notify('success', `Added: +${data.data.countryCode} ${data.data.phone}`);
//     } else notify('error', data.error || 'Failed');
//     setSaving(false);
//   };

//   const removeRecipient = async (rid: string) => {
//     if (!expandedAlertId || !confirm('Remove this number?')) return;
//     await api(`/recipients?alertId=${expandedAlertId}&recipientId=${rid}`, { method: 'DELETE' });
//     const newRecipients = editRecipients.filter(r => r.id !== rid);
//     setEditRecipients(newRecipients);
//     setAlerts(alerts.map(a => a.id === expandedAlertId ? { ...a, recipients: newRecipients } : a));
//     notify('success', 'Removed');
//   };

//   const sendTest = async (alertId: string) => {
//     const alert = alerts.find(a => a.id === alertId);
//     if (!alert?.recipients?.length) {
//       notify('error', 'Add phone numbers first');
//       return;
//     }
//     setSending(alertId);
//     const data = await api('/send-test', { method: 'POST', body: JSON.stringify({ alertId }) });
//     if (data.success) {
//       notify('success', `Sent to ${data.sent || 0} number(s)`);
//       if (selectedCompany) loadAlerts(selectedCompany.id);
//     } else notify('error', data.error || 'Failed');
//     setSending(null);
//   };

//   const sendQuickTest = async () => {
//     if (quickTestForm.phone.length < 7) { notify('error', 'Enter valid phone'); return; }
//     setSaving(true);
//     setQuickTestResult(null);
//     const endpoint = quickTestForm.testType === 'text' ? '/quick-test' : '/quick-test-image';
//     const payload = quickTestForm.testType === 'text'
//       ? { countryCode: quickTestForm.countryCode, phone: quickTestForm.phone.replace(/\D/g, ''), message: quickTestForm.message }
//       : { countryCode: quickTestForm.countryCode, phone: quickTestForm.phone.replace(/\D/g, ''), bucket: quickTestForm.bucket, s3Key: quickTestForm.s3Key, caption: quickTestForm.caption };
//     const data = await api(endpoint, { method: 'POST', body: JSON.stringify(payload) });
//     setQuickTestResult(data);
//     if (data.success) notify('success', `✅ Sent to ${data.phone}`);
//     else notify('error', data.error || 'Failed');
//     setSaving(false);
//   };

//   const companyAlerts = alerts.filter(a => a.companyId === selectedCompany?.id);

//   if (loading) return (
//     <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
//       <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#0a0e1a] text-white">
//       {toast && (
//         <div className={`fixed top-4 right-4 z-50 px-5 py-4 rounded-xl flex items-center gap-3 shadow-2xl ${toast.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
//           {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
//           {toast.msg}
//         </div>
//       )}

//       <header className="border-b border-slate-800 bg-[#0a0e1a]/95 backdrop-blur sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
//               <Shield className="w-7 h-7" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold"><span className="text-blue-400">Whatsaap</span> Manager</h1>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <button onClick={() => { setShowQuickTest(true); loadS3Images(); }} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/30">
//               <MessageCircle className="w-5 h-5" /><span className="hidden sm:inline">Quick Test</span>
//             </button>
//             <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${systemStatus?.greenApi?.authorized ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
//               <div className={`w-2 h-2 rounded-full ${systemStatus?.greenApi?.authorized ? 'bg-emerald-500' : 'bg-red-500'}`} />
//               <span className={`text-sm ${systemStatus?.greenApi?.authorized ? 'text-emerald-400' : 'text-red-400'}`}>{systemStatus?.greenApi?.instance || '...'}</span>
//             </div>
//             <div className="text-right">
//               <div className="text-xs text-slate-500">Riyadh</div>
//               <div className="text-xl font-mono text-blue-400">{time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Riyadh' })}</div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
//         <div className="col-span-12 lg:col-span-3">
//           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl">
//             <div className="p-4 border-b border-slate-800 flex items-center gap-2">
//               <Building2 className="w-4 h-4 text-blue-400" /><span className="text-sm font-semibold text-slate-300 uppercase">Companies</span>
//             </div>
//             <div className="p-3">
//               {companies.map(c => (
//                 <button key={c.id} onClick={() => { setSelectedCompany(c); setExpandedAlertId(null); }}
//                   className={`w-full p-4 rounded-xl text-left mb-2 transition ${selectedCompany?.id === c.id ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-slate-800 border border-transparent'}`}>
//                   <div className="flex items-center gap-3">
//                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCompany?.id === c.id ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
//                       <Building2 className="w-5 h-5" />
//                     </div>
//                     <div><div className="font-semibold">{c.name}</div><div className="text-xs text-slate-500 font-mono">{c.bucket}</div></div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="mt-4 grid grid-cols-2 gap-3">
//             <div className="bg-[#0f1629] border border-slate-800 rounded-xl p-4">
//               <Bell className="w-4 h-4 text-blue-400 mb-2" />
//               <div className="text-2xl font-bold">{companyAlerts.reduce((s, a) => s + (a.sentCount || 0), 0)}</div>
//               <div className="text-xs text-slate-500">Sent</div>
//             </div>
//             <div className="bg-[#0f1629] border border-slate-800 rounded-xl p-4">
//               <CheckCircle className="w-4 h-4 text-emerald-400 mb-2" />
//               <div className="text-2xl font-bold text-emerald-400">{companyAlerts.filter(a => a.active).length}</div>
//               <div className="text-xs text-slate-500">Active</div>
//             </div>
//           </div>
//           <div className="mt-4 bg-[#0f1629] border border-slate-800 rounded-xl p-4">
//             <div className="flex items-center gap-2 mb-3"><Server className="w-4 h-4 text-emerald-400" /><span className="text-sm font-semibold text-slate-300">Green API</span></div>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between"><span className="text-slate-500">Instance:</span><span className="text-emerald-400 font-mono">{systemStatus?.greenApi?.instance || '...'}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className={systemStatus?.greenApi?.authorized ? 'text-emerald-400' : 'text-red-400'}>{systemStatus?.whatsappStatus?.stateInstance || '...'}</span></div>
//             </div>
//             <button onClick={loadStatus} className="mt-3 w-full py-2 text-xs bg-slate-800 rounded-lg text-slate-400 hover:bg-slate-700"><RefreshCw className="w-3 h-3 inline mr-1" />Refresh</button>
//           </div>
//         </div>

//         <div className="col-span-12 lg:col-span-9">
//           {selectedCompany ? (
//             <>
//               <div className="bg-gradient-to-r from-[#0f1629] to-[#111827] border border-slate-800 rounded-2xl p-6 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
//                     <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
//                       <span className="flex items-center gap-1"><Camera className="w-4 h-4 text-blue-400" /><span className="font-mono">{selectedCompany.bucket}</span></span>
//                       <span className="flex items-center gap-1 text-cyan-400"><MapPin className="w-4 h-4" />All Floors</span>
//                     </div>
//                   </div>
//                   <button onClick={() => setShowAddAlert(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:scale-105 transition">
//                     <Plus className="w-5 h-5" />New Alert
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-[#0f1629] border border-slate-800 rounded-2xl">
//                 <div className="p-4 border-b border-slate-800 flex items-center gap-2">
//                   <Settings className="w-4 h-4 text-blue-400" /><span className="text-sm font-semibold text-slate-300 uppercase">Alert Configurations</span>
//                   <span className="ml-2 px-2.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">{companyAlerts.length}</span>
//                 </div>

//                 {companyAlerts.length === 0 ? (
//                   <div className="p-16 text-center">
//                     <Bell className="w-16 h-16 text-slate-700 mx-auto mb-4" />
//                     <p className="text-slate-500 mb-4">No alerts yet</p>
//                     <button onClick={() => setShowAddAlert(true)} className="text-blue-400">Create first alert →</button>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-slate-800">
//                     {companyAlerts.map(alert => (
//                       <div key={alert.id} className={`p-5 transition ${expandedAlertId === alert.id ? 'bg-blue-500/5' : 'hover:bg-slate-800/30'}`}>
//                         <div className="flex items-start gap-4">
//                           <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${alert.active ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
//                             {VIOLATIONS.find(v => v.value === alert.violationType)?.icon || '⚠️'}
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 flex-wrap">
//                               <span className="font-semibold text-lg">{VIOLATIONS.find(v => v.value === alert.violationType)?.label}</span>
//                               <span className={`px-2.5 py-1 text-xs rounded-full ${alert.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>{alert.active ? '● Active' : '○ Paused'}</span>
//                               <span className={`px-2.5 py-1 text-xs rounded-full ${alert.schedule === 'instant' ? 'bg-yellow-500/20 text-yellow-400' : alert.schedule === 'hourly' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
//                                 {alert.schedule === 'instant' ? '⚡ Instant' : alert.schedule === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-4 mt-2 text-sm text-slate-400 flex-wrap">
//                               <span className="flex items-center gap-1.5 text-cyan-400"><MapPin className="w-4 h-4" />All Floors</span>
//                               <span className="flex items-center gap-1.5 text-blue-400"><Phone className="w-4 h-4" />{(alert.recipients || []).length} numbers</span>
//                               <span className="flex items-center gap-1.5"><Send className="w-4 h-4" />{alert.sentCount || 0} sent</span>
//                             </div>
//                           </div>
//                           <div className="flex gap-1">
//                             <button onClick={() => openEditPanel(alert)} className={`p-2.5 rounded-lg ${expandedAlertId === alert.id ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-slate-800 text-slate-400'}`} title="Edit"><Edit3 className="w-5 h-5" /></button>
//                             <button onClick={() => sendTest(alert.id)} disabled={sending === alert.id} className="p-2.5 hover:bg-emerald-500/20 rounded-lg text-emerald-400 disabled:opacity-50" title="Test">
//                               {sending === alert.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//                             </button>
//                             <button onClick={() => toggleAlert(alert)} className={`p-2.5 hover:bg-slate-800 rounded-lg ${alert.active ? 'text-emerald-400' : 'text-slate-400'}`}>{alert.active ? <RefreshCw className="w-5 h-5" /> : <Zap className="w-5 h-5" />}</button>
//                             <button onClick={() => deleteAlert(alert.id)} className="p-2.5 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
//                           </div>
//                         </div>

//                         {/* EDIT PANEL - Uses separate state variables */}
//                         {expandedAlertId === alert.id && (
//                           <div className="mt-6 pt-6 border-t border-slate-800">
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                               <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                   <h4 className="text-sm text-slate-400 flex items-center gap-2"><Edit3 className="w-4 h-4 text-blue-400" />Edit Alert</h4>
//                                   {hasChanges && <span className="text-xs text-yellow-400 animate-pulse">● Unsaved</span>}
//                                 </div>
                                
//                                 <div>
//                                   <label className="text-xs text-slate-500 mb-1 block">Violation Type</label>
//                                   <select 
//                                     value={editViolationType} 
//                                     onChange={e => { setEditViolationType(e.target.value); setHasChanges(true); }} 
//                                     className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-700 rounded-lg text-white text-sm"
//                                   >
//                                     {VIOLATIONS.map(v => <option key={v.value} value={v.value}>{v.icon} {v.label}</option>)}
//                                   </select>
//                                 </div>
                                
//                                 <div>
//                                   <label className="text-xs text-slate-500 mb-1 block">Schedule</label>
//                                   <div className="grid grid-cols-3 gap-2">
//                                     {(['instant', 'hourly', 'daily'] as const).map(s => (
//                                       <button 
//                                         key={s} 
//                                         type="button"
//                                         onClick={() => { setEditSchedule(s); setHasChanges(true); }} 
//                                         className={`p-2 rounded-lg border text-xs font-medium ${editSchedule === s ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-700 text-slate-400'}`}
//                                       >
//                                         {s === 'instant' ? '⚡ Instant' : s === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
//                                       </button>
//                                     ))}
//                                   </div>
//                                 </div>
                                
//                                 {editSchedule === 'daily' && (
//                                   <div>
//                                     <label className="text-xs text-slate-500 mb-1 block">Time</label>
//                                     <input 
//                                       type="time" 
//                                       value={editScheduledTime} 
//                                       onChange={e => { setEditScheduledTime(e.target.value); setHasChanges(true); }} 
//                                       className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-700 rounded-lg text-white text-sm" 
//                                     />
//                                   </div>
//                                 )}
                                
//                                 <div>
//                                   <label className="text-xs text-slate-500 mb-1 block">Message Caption</label>
//                                   <textarea 
//                                     value={editCaption} 
//                                     onChange={e => { setEditCaption(e.target.value); setHasChanges(true); }} 
//                                     rows={5} 
//                                     className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-700 rounded-lg text-white text-sm font-mono resize-none" 
//                                   />
//                                   <p className="text-xs text-slate-600 mt-1">Variables: {'{violation}'}, {'{location}'}, {'{timestamp}'}, {'{camera}'}</p>
//                                 </div>
                                
//                                 <button 
//                                   type="button"
//                                   onClick={saveAlert} 
//                                   disabled={saving || !hasChanges} 
//                                   className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${hasChanges ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
//                                 >
//                                   {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
//                                   {hasChanges ? 'Save Changes' : 'No Changes'}
//                                 </button>
//                               </div>
                              
//                               <div>
//                                 <div className="flex items-center justify-between mb-3">
//                                   <h4 className="text-sm text-slate-400 flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" />Phone Numbers</h4>
//                                   <button type="button" onClick={() => setShowAddRecipient(true)} className="flex items-center gap-1.5 text-sm text-blue-400 px-3 py-1.5 bg-blue-500/10 rounded-lg hover:bg-blue-500/20">
//                                     <Plus className="w-4 h-4" />Add
//                                   </button>
//                                 </div>
//                                 <div className="space-y-2 max-h-64 overflow-y-auto">
//                                   {editRecipients.length > 0 ? (
//                                     editRecipients.map(r => (
//                                       <div key={r.id} className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-xl border border-slate-800 group hover:border-slate-700">
//                                         <div className="flex items-center gap-3">
//                                           <div className="w-3 h-3 rounded-full bg-emerald-500" />
//                                           <div>
//                                             <div className="font-medium text-sm">{r.name}</div>
//                                             <div className="flex items-center gap-2 mt-0.5">
//                                               <span className="text-blue-400 font-mono text-sm">+{r.countryCode} {r.phone}</span>
//                                               <span className="text-xs">{COUNTRIES.find(c => c.code === r.countryCode)?.flag}</span>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <button type="button" onClick={() => removeRecipient(r.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100"><X className="w-4 h-4" /></button>
//                                       </div>
//                                     ))
//                                   ) : (
//                                     <div className="text-center py-8 bg-[#0a0e1a] rounded-xl border border-dashed border-slate-700">
//                                       <Phone className="w-8 h-8 text-slate-700 mx-auto mb-2" />
//                                       <p className="text-sm text-slate-500">No numbers</p>
//                                       <button type="button" onClick={() => setShowAddRecipient(true)} className="text-blue-400 text-sm mt-2">Add first →</button>
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-96 bg-[#0f1629] border border-slate-800 rounded-2xl">
//               <div className="text-center"><Building2 className="w-16 h-16 text-slate-700 mx-auto mb-4" /><p className="text-slate-500">Select a company</p></div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add Alert Modal */}
//       {showAddAlert && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
//           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">New Alert</h3>
//               <button onClick={() => setShowAddAlert(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
//             </div>
//             <div className="space-y-5">
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Violation Type</label>
//                 <select value={alertForm.violationType} onChange={e => setAlertForm({ ...alertForm, violationType: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">
//                   {VIOLATIONS.map(v => <option key={v.value} value={v.value}>{v.icon} {v.label}</option>)}
//                 </select>
//               </div>
//               <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
//                 <div className="flex items-center gap-2 text-cyan-400"><MapPin className="w-5 h-5" /><span className="font-semibold">All Floors</span></div>
//                 <p className="text-sm text-slate-400 mt-2">Alert triggers on ANY floor.</p>
//               </div>
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Schedule</label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {(['instant', 'hourly', 'daily'] as const).map(s => (
//                     <button key={s} type="button" onClick={() => setAlertForm({ ...alertForm, schedule: s })} className={`p-4 rounded-xl border text-sm font-medium ${alertForm.schedule === s ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-400'}`}>
//                       {s === 'instant' ? '⚡ Instant' : s === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {alertForm.schedule === 'daily' && (
//                 <div>
//                   <label className="text-sm text-slate-400 mb-2 block">Time</label>
//                   <input type="time" value={alertForm.scheduledTime} onChange={e => setAlertForm({ ...alertForm, scheduledTime: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white" />
//                 </div>
//               )}
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Caption</label>
//                 <textarea value={alertForm.caption} onChange={e => setAlertForm({ ...alertForm, caption: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono text-sm resize-none" />
//                 <p className="text-xs text-slate-500 mt-2">Variables: {'{violation}'}, {'{location}'}, {'{timestamp}'}, {'{camera}'}</p>
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button type="button" onClick={() => setShowAddAlert(false)} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
//               <button type="button" onClick={createAlert} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
//                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Phone Modal */}
//       {showAddRecipient && expandedAlertId && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
//           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-md p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">Add Phone</h3>
//               <button onClick={() => setShowAddRecipient(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
//             </div>
//             <div className="space-y-5">
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Name</label>
//                 <input type="text" value={recipientForm.name} onChange={e => setRecipientForm({ ...recipientForm, name: e.target.value })} placeholder="Safety Manager" className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white" />
//               </div>
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Country</label>
//                 <select value={recipientForm.countryCode} onChange={e => setRecipientForm({ ...recipientForm, countryCode: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">
//                   {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} +{c.code} — {c.name}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Phone</label>
//                 <div className="flex">
//                   <div className="px-4 py-3 bg-slate-800 rounded-l-xl text-blue-400 font-mono">{COUNTRIES.find(c => c.code === recipientForm.countryCode)?.flag} +{recipientForm.countryCode}</div>
//                   <input type="tel" value={recipientForm.phone} onChange={e => setRecipientForm({ ...recipientForm, phone: e.target.value.replace(/\D/g, '') })} placeholder="545974262" className="flex-1 px-4 py-3 bg-[#0a0e1a] border border-slate-800 border-l-0 rounded-r-xl text-white font-mono" />
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button type="button" onClick={() => setShowAddRecipient(false)} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
//               <button type="button" onClick={addRecipient} disabled={saving || !recipientForm.name || !recipientForm.phone} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
//                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Quick Test Modal */}
//       {showQuickTest && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
//           <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold flex items-center gap-2"><MessageCircle className="w-6 h-6 text-emerald-400" />Quick Test</h3>
//               <button onClick={() => { setShowQuickTest(false); setQuickTestResult(null); }} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
//             </div>
//             <div className="flex gap-2 mb-6">
//               <button type="button" onClick={() => setQuickTestForm({ ...quickTestForm, testType: 'text' })} className={`flex-1 py-3 rounded-xl border font-medium flex items-center justify-center gap-2 ${quickTestForm.testType === 'text' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 text-slate-400'}`}>
//                 <MessageCircle className="w-5 h-5" />Text
//               </button>
//               <button type="button" onClick={() => setQuickTestForm({ ...quickTestForm, testType: 'image' })} className={`flex-1 py-3 rounded-xl border font-medium flex items-center justify-center gap-2 ${quickTestForm.testType === 'image' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-400'}`}>
//                 <Image className="w-5 h-5" />Image
//               </button>
//             </div>
//             <div className="space-y-5">
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Country</label>
//                 <select value={quickTestForm.countryCode} onChange={e => setQuickTestForm({ ...quickTestForm, countryCode: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">
//                   {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} +{c.code} — {c.name}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-sm text-slate-400 mb-2 block">Phone</label>
//                 <div className="flex">
//                   <div className="px-4 py-3 bg-slate-800 rounded-l-xl text-emerald-400 font-mono">{COUNTRIES.find(c => c.code === quickTestForm.countryCode)?.flag} +{quickTestForm.countryCode}</div>
//                   <input type="tel" value={quickTestForm.phone} onChange={e => setQuickTestForm({ ...quickTestForm, phone: e.target.value.replace(/\D/g, '') })} placeholder="545974262" className="flex-1 px-4 py-3 bg-[#0a0e1a] border border-slate-800 border-l-0 rounded-r-xl text-white font-mono" />
//                 </div>
//               </div>
//               {quickTestForm.testType === 'text' && (
//                 <div>
//                   <label className="text-sm text-slate-400 mb-2 block">Message</label>
//                   <textarea value={quickTestForm.message} onChange={e => setQuickTestForm({ ...quickTestForm, message: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono text-sm resize-none" />
//                 </div>
//               )}
//               {quickTestForm.testType === 'image' && (
//                 <>
//                   <div>
//                     <label className="text-sm text-slate-400 mb-2 block">S3 Bucket</label>
//                     <input type="text" value={quickTestForm.bucket} onChange={e => setQuickTestForm({ ...quickTestForm, bucket: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono" />
//                   </div>
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <label className="text-sm text-slate-400">Select Image</label>
//                       <button type="button" onClick={loadS3Images} disabled={loadingImages} className="text-xs text-blue-400">{loadingImages ? <Loader2 className="w-4 h-4 animate-spin" /> : '↻ Refresh'}</button>
//                     </div>
//                     {s3Images.length > 0 ? (
//                       <div className="max-h-48 overflow-y-auto bg-[#0a0e1a] border border-slate-800 rounded-xl">
//                         {s3Images.map((img, idx) => (
//                           <button key={idx} type="button" onClick={() => setQuickTestForm({ ...quickTestForm, s3Key: img.key })} className={`w-full px-4 py-3 text-left border-b border-slate-800 last:border-0 hover:bg-slate-800 ${quickTestForm.s3Key === img.key ? 'bg-blue-500/20' : ''}`}>
//                             <div className="flex items-center gap-3">
//                               <FileImage className={`w-5 h-5 ${quickTestForm.s3Key === img.key ? 'text-blue-400' : 'text-slate-500'}`} />
//                               <div className="flex-1 min-w-0"><div className="text-sm font-mono truncate">{img.name}</div></div>
//                               {quickTestForm.s3Key === img.key && <CheckCircle className="w-5 h-5 text-blue-400" />}
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="p-8 bg-[#0a0e1a] border border-slate-800 rounded-xl text-center text-slate-500">{loadingImages ? 'Loading...' : 'No images'}</div>
//                     )}
//                   </div>
//                 </>
//               )}
//               {quickTestResult && (
//                 <div className={`p-4 rounded-xl border ${quickTestResult.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
//                   {quickTestResult.success ? '✅ Sent!' : `❌ ${quickTestResult.error || 'Failed'}`}
//                 </div>
//               )}
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button type="button" onClick={() => { setShowQuickTest(false); setQuickTestResult(null); }} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
//               <button type="button" onClick={sendQuickTest} disabled={saving || !quickTestForm.phone} className={`flex-1 py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2 ${quickTestForm.testType === 'image' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'}`}>
//                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import { 
  Bell, Building2, Send, Plus, Trash2, CheckCircle, 
  RefreshCw, Shield, Camera, Settings, X, Loader2, 
  AlertTriangle, Zap, Phone, Globe, User, MessageCircle, Image,
  FileImage, Server, MapPin, Save, Edit3, Lock, LogOut, Eye, EyeOff
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://dvzdg005z5.execute-api.us-east-1.amazonaws.com/prod';

interface Recipient { id: string; name: string; phone: string; countryCode: string; active: boolean; }
interface AlertConfig { id: string; companyId: string; violationType: string; schedule: 'instant' | 'hourly' | 'daily'; scheduledTime?: string; recipients: Recipient[]; caption: string; active: boolean; lastSent?: string; sentCount: number; }
interface Company { id: string; name: string; bucket: string; prefix: string; }
interface S3Image { key: string; name: string; size: number; lastModified: string; }

const VIOLATIONS = [
  { value: 'no_gloves', label: 'No Gloves', icon: '🧤' },
  { value: 'no_helmet', label: 'No Helmet', icon: '⛑️' },
  { value: 'no_safety_glasses', label: 'No Safety Glasses', icon: '🥽' },
  { value: 'blocking_emergency_equipment', label: 'Blocking Emergency', icon: '🚨' },
  { value: 'climbing_safety', label: 'Climbing Safety', icon: '🧗' },
  { value: 'height_safety', label: 'Height Safety', icon: '📏' },
  { value: 'poor_housekeeping', label: 'Poor Housekeeping', icon: '🧹' },
  { value: 'running', label: 'Running', icon: '🏃' },
];

const COUNTRIES = [
  { code: '966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '971', name: 'UAE', flag: '🇦🇪' },
  { code: '973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '974', name: 'Qatar', flag: '🇶🇦' },
  { code: '965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '968', name: 'Oman', flag: '🇴🇲' },
  { code: '20', name: 'Egypt', flag: '🇪🇬' },
  { code: '962', name: 'Jordan', flag: '🇯🇴' },
  { code: '91', name: 'India', flag: '🇮🇳' },
  { code: '92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '63', name: 'Philippines', flag: '🇵🇭' },
  { code: '880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '977', name: 'Nepal', flag: '🇳🇵' },
  { code: '1', name: 'USA/Canada', flag: '🇺🇸' },
  { code: '44', name: 'UK', flag: '🇬🇧' },
];

async function api(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options?.headers } });
    return await res.json();
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// ============================================
// LOGIN PAGE COMPONENT
// ============================================
function LoginPage({ onLogin }: { onLogin: (token: string, username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    if (data.success && data.token) {
      localStorage.setItem('falconx_token', data.token);
      localStorage.setItem('falconx_username', data.username);
      onLogin(data.token, data.username);
    } else {
      setError(data.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            <span className="text-blue-400">NommasConnect</span>
          </h1>
          <p className="text-slate-500 mt-2">Safety Alert System</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f1629] border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Sign In</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0e1a] border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-12 py-3 bg-[#0a0e1a] border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-600">
              Powered by <span className="text-blue-400">Nommas.AI</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-sm mt-6">
          © 2024 FalconX Safety System
        </p>
      </div>
    </div>
  );
}

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
function Dashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);
  
  const [editViolationType, setEditViolationType] = useState('');
  const [editSchedule, setEditSchedule] = useState<'instant' | 'hourly' | 'daily'>('instant');
  const [editScheduledTime, setEditScheduledTime] = useState('08:00');
  const [editCaption, setEditCaption] = useState('');
  const [editRecipients, setEditRecipients] = useState<Recipient[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [time, setTime] = useState(new Date());
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showAddRecipient, setShowAddRecipient] = useState(false);
  const [showQuickTest, setShowQuickTest] = useState(false);
  const [quickTestResult, setQuickTestResult] = useState<any>(null);
  const [s3Images, setS3Images] = useState<S3Image[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  
  const [alertForm, setAlertForm] = useState({
    violationType: 'no_gloves',
    schedule: 'instant' as 'instant' | 'hourly' | 'daily',
    scheduledTime: '08:00',
    caption: '⚠️ PPE Violation: {violation}\n📍 Location: {location}\n🕐 Time: {timestamp}\n📸 Camera: {camera}'
  });
  
  const [recipientForm, setRecipientForm] = useState({ name: '', phone: '', countryCode: '966' });
  const [quickTestForm, setQuickTestForm] = useState({
    countryCode: '966', phone: '', message: '🧪 FalconX Test\n✅ Working!\n🦅 Safety Alert System',
    testType: 'text' as 'text' | 'image', bucket: 'aramco-cctv-monitoring-videos', s3Key: '', caption: ''
  });

  const notify = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const loadCompanies = async () => {
    const data = await api('/companies');
    if (data.success && data.data) {
      setCompanies(data.data);
      if (data.data.length > 0) setSelectedCompany(data.data[0]);
    }
  };

  const loadAlerts = async (companyId: string) => {
    const data = await api(`/alerts?companyId=${companyId}`);
    if (data.success && data.data) setAlerts(data.data);
  };

  const loadStatus = async () => {
    const data = await api('/status');
    if (data.success) setSystemStatus(data);
  };

  const loadS3Images = async () => {
    setLoadingImages(true);
    const data = await api(`/images?bucket=${quickTestForm.bucket}`);
    if (data.success && data.images) setS3Images(data.images);
    setLoadingImages(false);
  };

  useEffect(() => {
    loadCompanies().finally(() => setLoading(false));
    loadStatus();
  }, []);

  useEffect(() => {
    if (selectedCompany) loadAlerts(selectedCompany.id);
  }, [selectedCompany]);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const createAlert = async () => {
    if (!selectedCompany) return;
    setSaving(true);
    const data = await api('/alerts', { method: 'POST', body: JSON.stringify({ companyId: selectedCompany.id, ...alertForm }) });
    if (data.success) { await loadAlerts(selectedCompany.id); setShowAddAlert(false); notify('success', 'Alert created!'); }
    else notify('error', data.error || 'Failed');
    setSaving(false);
  };

  const openEditPanel = (alert: AlertConfig) => {
    if (expandedAlertId === alert.id) {
      setExpandedAlertId(null);
      setHasChanges(false);
    } else {
      setExpandedAlertId(alert.id);
      setEditViolationType(alert.violationType);
      setEditSchedule(alert.schedule);
      setEditScheduledTime(alert.scheduledTime || '08:00');
      setEditCaption(alert.caption);
      setEditRecipients(alert.recipients || []);
      setHasChanges(false);
    }
  };

  const saveAlert = async () => {
    if (!expandedAlertId) return;
    setSaving(true);
    const data = await api('/alerts', { 
      method: 'PUT', 
      body: JSON.stringify({ id: expandedAlertId, violationType: editViolationType, schedule: editSchedule, scheduledTime: editScheduledTime, caption: editCaption }) 
    });
    if (data.success) {
      setAlerts(alerts.map(a => a.id === expandedAlertId ? { ...a, violationType: editViolationType, schedule: editSchedule, scheduledTime: editScheduledTime, caption: editCaption } : a));
      setHasChanges(false);
      notify('success', '✅ Alert saved!');
    } else notify('error', data.error || 'Failed to save');
    setSaving(false);
  };

  const toggleAlert = async (alert: AlertConfig) => {
    const newActive = !alert.active;
    await api('/alerts', { method: 'PUT', body: JSON.stringify({ id: alert.id, active: newActive }) });
    setAlerts(alerts.map(a => a.id === alert.id ? { ...a, active: newActive } : a));
    notify('success', newActive ? 'Activated' : 'Paused');
  };

  const deleteAlert = async (id: string) => {
    if (!confirm('Delete this alert?')) return;
    await api(`/alerts?id=${id}`, { method: 'DELETE' });
    setAlerts(alerts.filter(a => a.id !== id));
    if (expandedAlertId === id) setExpandedAlertId(null);
    notify('success', 'Deleted');
  };

  const addRecipient = async () => {
    if (!expandedAlertId) return;
    if (!recipientForm.name.trim() || recipientForm.phone.length < 7) { notify('error', 'Enter name and valid phone'); return; }
    setSaving(true);
    const data = await api('/recipients', { method: 'POST', body: JSON.stringify({ alertId: expandedAlertId, name: recipientForm.name.trim(), phone: recipientForm.phone.replace(/\D/g, ''), countryCode: recipientForm.countryCode }) });
    if (data.success) {
      const newRecipient = data.data;
      setEditRecipients([...editRecipients, newRecipient]);
      setAlerts(alerts.map(a => a.id === expandedAlertId ? { ...a, recipients: [...(a.recipients || []), newRecipient] } : a));
      setShowAddRecipient(false);
      setRecipientForm({ name: '', phone: '', countryCode: '966' });
      notify('success', `Added: +${data.data.countryCode} ${data.data.phone}`);
    } else notify('error', data.error || 'Failed');
    setSaving(false);
  };

  const removeRecipient = async (rid: string) => {
    if (!expandedAlertId || !confirm('Remove this number?')) return;
    await api(`/recipients?alertId=${expandedAlertId}&recipientId=${rid}`, { method: 'DELETE' });
    const newRecipients = editRecipients.filter(r => r.id !== rid);
    setEditRecipients(newRecipients);
    setAlerts(alerts.map(a => a.id === expandedAlertId ? { ...a, recipients: newRecipients } : a));
    notify('success', 'Removed');
  };

  const sendTest = async (alertId: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert?.recipients?.length) { notify('error', 'Add phone numbers first'); return; }
    setSending(alertId);
    const data = await api('/send-test', { method: 'POST', body: JSON.stringify({ alertId }) });
    if (data.success) { notify('success', `Sent to ${data.sent || 0} number(s)`); if (selectedCompany) loadAlerts(selectedCompany.id); }
    else notify('error', data.error || 'Failed');
    setSending(null);
  };

  const sendQuickTest = async () => {
    if (quickTestForm.phone.length < 7) { notify('error', 'Enter valid phone'); return; }
    setSaving(true); setQuickTestResult(null);
    const endpoint = quickTestForm.testType === 'text' ? '/quick-test' : '/quick-test-image';
    const payload = quickTestForm.testType === 'text'
      ? { countryCode: quickTestForm.countryCode, phone: quickTestForm.phone.replace(/\D/g, ''), message: quickTestForm.message }
      : { countryCode: quickTestForm.countryCode, phone: quickTestForm.phone.replace(/\D/g, ''), bucket: quickTestForm.bucket, s3Key: quickTestForm.s3Key, caption: quickTestForm.caption };
    const data = await api(endpoint, { method: 'POST', body: JSON.stringify(payload) });
    setQuickTestResult(data);
    if (data.success) notify('success', `✅ Sent to ${data.phone}`);
    else notify('error', data.error || 'Failed');
    setSaving(false);
  };

  const companyAlerts = alerts.filter(a => a.companyId === selectedCompany?.id);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-4 rounded-xl flex items-center gap-3 shadow-2xl ${toast.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}

      <header className="border-b border-slate-800 bg-[#0a0e1a]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold"><span className="text-blue-400">Nommas</span>Connect</h1>
              <p className="text-xs text-slate-500">Alert System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => { setShowQuickTest(true); loadS3Images(); }} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/30">
              <MessageCircle className="w-5 h-5" /><span className="hidden sm:inline">Quick Test</span>
            </button>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${systemStatus?.greenApi?.authorized ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
              <div className={`w-2 h-2 rounded-full ${systemStatus?.greenApi?.authorized ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className={`text-sm ${systemStatus?.greenApi?.authorized ? 'text-emerald-400' : 'text-red-400'}`}>{systemStatus?.greenApi?.instance || '...'}</span>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-500">Riyadh</div>
              <div className="text-xl font-mono text-blue-400">{time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Riyadh' })}</div>
            </div>
            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-white">{username}</div>
                <div className="text-xs text-slate-500">Administrator</div>
              </div>
              <button onClick={onLogout} className="p-2.5 hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-400 transition" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-[#0f1629] border border-slate-800 rounded-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" /><span className="text-sm font-semibold text-slate-300 uppercase">Companies</span>
            </div>
            <div className="p-3">
              {companies.map(c => (
                <button key={c.id} onClick={() => { setSelectedCompany(c); setExpandedAlertId(null); }}
                  className={`w-full p-4 rounded-xl text-left mb-2 transition ${selectedCompany?.id === c.id ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-slate-800 border border-transparent'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCompany?.id === c.id ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div><div className="font-semibold">{c.name}</div><div className="text-xs text-slate-500 font-mono">{c.bucket}</div></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-[#0f1629] border border-slate-800 rounded-xl p-4">
              <Bell className="w-4 h-4 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">{companyAlerts.reduce((s, a) => s + (a.sentCount || 0), 0)}</div>
              <div className="text-xs text-slate-500">Sent</div>
            </div>
            <div className="bg-[#0f1629] border border-slate-800 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-emerald-400 mb-2" />
              <div className="text-2xl font-bold text-emerald-400">{companyAlerts.filter(a => a.active).length}</div>
              <div className="text-xs text-slate-500">Active</div>
            </div>
          </div>
          <div className="mt-4 bg-[#0f1629] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><Server className="w-4 h-4 text-emerald-400" /><span className="text-sm font-semibold text-slate-300">Green API</span></div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Instance:</span><span className="text-emerald-400 font-mono">{systemStatus?.greenApi?.instance || '...'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className={systemStatus?.greenApi?.authorized ? 'text-emerald-400' : 'text-red-400'}>{systemStatus?.whatsappStatus?.stateInstance || '...'}</span></div>
            </div>
            <button onClick={loadStatus} className="mt-3 w-full py-2 text-xs bg-slate-800 rounded-lg text-slate-400 hover:bg-slate-700"><RefreshCw className="w-3 h-3 inline mr-1" />Refresh</button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          {selectedCompany ? (
            <>
              <div className="bg-gradient-to-r from-[#0f1629] to-[#111827] border border-slate-800 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><Camera className="w-4 h-4 text-blue-400" /><span className="font-mono">{selectedCompany.bucket}</span></span>
                      <span className="flex items-center gap-1 text-cyan-400"><MapPin className="w-4 h-4" />All Floors</span>
                    </div>
                  </div>
                  <button onClick={() => setShowAddAlert(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:scale-105 transition">
                    <Plus className="w-5 h-5" />New Alert
                  </button>
                </div>
              </div>

              <div className="bg-[#0f1629] border border-slate-800 rounded-2xl">
                <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" /><span className="text-sm font-semibold text-slate-300 uppercase">Alert Configurations</span>
                  <span className="ml-2 px-2.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">{companyAlerts.length}</span>
                </div>

                {companyAlerts.length === 0 ? (
                  <div className="p-16 text-center">
                    <Bell className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">No alerts yet</p>
                    <button onClick={() => setShowAddAlert(true)} className="text-blue-400">Create first alert →</button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800">
                    {companyAlerts.map(alert => (
                      <div key={alert.id} className={`p-5 transition ${expandedAlertId === alert.id ? 'bg-blue-500/5' : 'hover:bg-slate-800/30'}`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${alert.active ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
                            {VIOLATIONS.find(v => v.value === alert.violationType)?.icon || '⚠️'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-lg">{VIOLATIONS.find(v => v.value === alert.violationType)?.label}</span>
                              <span className={`px-2.5 py-1 text-xs rounded-full ${alert.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>{alert.active ? '● Active' : '○ Paused'}</span>
                              <span className={`px-2.5 py-1 text-xs rounded-full ${alert.schedule === 'instant' ? 'bg-yellow-500/20 text-yellow-400' : alert.schedule === 'hourly' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                {alert.schedule === 'instant' ? '⚡ Instant' : alert.schedule === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400 flex-wrap">
                              <span className="flex items-center gap-1.5 text-cyan-400"><MapPin className="w-4 h-4" />All Floors</span>
                              <span className="flex items-center gap-1.5 text-blue-400"><Phone className="w-4 h-4" />{(alert.recipients || []).length} numbers</span>
                              <span className="flex items-center gap-1.5"><Send className="w-4 h-4" />{alert.sentCount || 0} sent</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => openEditPanel(alert)} className={`p-2.5 rounded-lg ${expandedAlertId === alert.id ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-slate-800 text-slate-400'}`} title="Edit"><Edit3 className="w-5 h-5" /></button>
                            <button onClick={() => sendTest(alert.id)} disabled={sending === alert.id} className="p-2.5 hover:bg-emerald-500/20 rounded-lg text-emerald-400 disabled:opacity-50" title="Test">
                              {sending === alert.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                            <button onClick={() => toggleAlert(alert)} className={`p-2.5 hover:bg-slate-800 rounded-lg ${alert.active ? 'text-emerald-400' : 'text-slate-400'}`}>{alert.active ? <RefreshCw className="w-5 h-5" /> : <Zap className="w-5 h-5" />}</button>
                            <button onClick={() => deleteAlert(alert.id)} className="p-2.5 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                          </div>
                        </div>

                        {expandedAlertId === alert.id && (
                          <div className="mt-6 pt-6 border-t border-slate-800">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm text-slate-400 flex items-center gap-2"><Edit3 className="w-4 h-4 text-blue-400" />Edit Alert</h4>
                                  {hasChanges && <span className="text-xs text-yellow-400 animate-pulse">● Unsaved</span>}
                                </div>
                                <div>
                                  <label className="text-xs text-slate-500 mb-1 block">Violation Type</label>
                                  <select value={editViolationType} onChange={e => { setEditViolationType(e.target.value); setHasChanges(true); }} className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-700 rounded-lg text-white text-sm">
                                    {VIOLATIONS.map(v => <option key={v.value} value={v.value}>{v.icon} {v.label}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <label className="text-xs text-slate-500 mb-1 block">Schedule</label>
                                  <div className="grid grid-cols-3 gap-2">
                                    {(['instant', 'hourly', 'daily'] as const).map(s => (
                                      <button key={s} type="button" onClick={() => { setEditSchedule(s); setHasChanges(true); }} className={`p-2 rounded-lg border text-xs font-medium ${editSchedule === s ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-700 text-slate-400'}`}>
                                        {s === 'instant' ? '⚡ Instant' : s === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                {editSchedule === 'daily' && (
                                  <div>
                                    <label className="text-xs text-slate-500 mb-1 block">Time</label>
                                    <input type="time" value={editScheduledTime} onChange={e => { setEditScheduledTime(e.target.value); setHasChanges(true); }} className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-700 rounded-lg text-white text-sm" />
                                  </div>
                                )}
                                <div>
                                  <label className="text-xs text-slate-500 mb-1 block">Message Caption</label>
                                  <textarea value={editCaption} onChange={e => { setEditCaption(e.target.value); setHasChanges(true); }} rows={5} className="w-full px-3 py-2 bg-[#0a0e1a] border border-slate-700 rounded-lg text-white text-sm font-mono resize-none" />
                                  <p className="text-xs text-slate-600 mt-1">Variables: {'{violation}'}, {'{location}'}, {'{timestamp}'}, {'{camera}'}</p>
                                </div>
                                <button type="button" onClick={saveAlert} disabled={saving || !hasChanges} className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${hasChanges ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}>
                                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                  {hasChanges ? 'Save Changes' : 'No Changes'}
                                </button>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-sm text-slate-400 flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" />Phone Numbers</h4>
                                  <button type="button" onClick={() => setShowAddRecipient(true)} className="flex items-center gap-1.5 text-sm text-blue-400 px-3 py-1.5 bg-blue-500/10 rounded-lg hover:bg-blue-500/20">
                                    <Plus className="w-4 h-4" />Add
                                  </button>
                                </div>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                  {editRecipients.length > 0 ? editRecipients.map(r => (
                                    <div key={r.id} className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-xl border border-slate-800 group hover:border-slate-700">
                                      <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <div>
                                          <div className="font-medium text-sm">{r.name}</div>
                                          <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-blue-400 font-mono text-sm">+{r.countryCode} {r.phone}</span>
                                            <span className="text-xs">{COUNTRIES.find(c => c.code === r.countryCode)?.flag}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <button type="button" onClick={() => removeRecipient(r.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100"><X className="w-4 h-4" /></button>
                                    </div>
                                  )) : (
                                    <div className="text-center py-8 bg-[#0a0e1a] rounded-xl border border-dashed border-slate-700">
                                      <Phone className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                      <p className="text-sm text-slate-500">No numbers</p>
                                      <button type="button" onClick={() => setShowAddRecipient(true)} className="text-blue-400 text-sm mt-2">Add first →</button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96 bg-[#0f1629] border border-slate-800 rounded-2xl">
              <div className="text-center"><Building2 className="w-16 h-16 text-slate-700 mx-auto mb-4" /><p className="text-slate-500">Select a company</p></div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddAlert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">New Alert</h3>
              <button onClick={() => setShowAddAlert(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-5">
              <div><label className="text-sm text-slate-400 mb-2 block">Violation Type</label><select value={alertForm.violationType} onChange={e => setAlertForm({ ...alertForm, violationType: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">{VIOLATIONS.map(v => <option key={v.value} value={v.value}>{v.icon} {v.label}</option>)}</select></div>
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl"><div className="flex items-center gap-2 text-cyan-400"><MapPin className="w-5 h-5" /><span className="font-semibold">All Floors</span></div><p className="text-sm text-slate-400 mt-2">Alert triggers on ANY floor.</p></div>
              <div><label className="text-sm text-slate-400 mb-2 block">Schedule</label><div className="grid grid-cols-3 gap-3">{(['instant', 'hourly', 'daily'] as const).map(s => (<button key={s} type="button" onClick={() => setAlertForm({ ...alertForm, schedule: s })} className={`p-4 rounded-xl border text-sm font-medium ${alertForm.schedule === s ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-400'}`}>{s === 'instant' ? '⚡ Instant' : s === 'hourly' ? '🕐 Hourly' : '📅 Daily'}</button>))}</div></div>
              {alertForm.schedule === 'daily' && <div><label className="text-sm text-slate-400 mb-2 block">Time</label><input type="time" value={alertForm.scheduledTime} onChange={e => setAlertForm({ ...alertForm, scheduledTime: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white" /></div>}
              <div><label className="text-sm text-slate-400 mb-2 block">Caption</label><textarea value={alertForm.caption} onChange={e => setAlertForm({ ...alertForm, caption: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono text-sm resize-none" /><p className="text-xs text-slate-500 mt-2">Variables: {'{violation}'}, {'{location}'}, {'{timestamp}'}, {'{camera}'}</p></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setShowAddAlert(false)} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
              <button type="button" onClick={createAlert} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">{saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}Create</button>
            </div>
          </div>
        </div>
      )}

      {showAddRecipient && expandedAlertId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6"><h3 className="text-xl font-bold">Add Phone</h3><button onClick={() => setShowAddRecipient(false)} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button></div>
            <div className="space-y-5">
              <div><label className="text-sm text-slate-400 mb-2 block">Name</label><input type="text" value={recipientForm.name} onChange={e => setRecipientForm({ ...recipientForm, name: e.target.value })} placeholder="Safety Manager" className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white" /></div>
              <div><label className="text-sm text-slate-400 mb-2 block">Country</label><select value={recipientForm.countryCode} onChange={e => setRecipientForm({ ...recipientForm, countryCode: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">{COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} +{c.code} — {c.name}</option>)}</select></div>
              <div><label className="text-sm text-slate-400 mb-2 block">Phone</label><div className="flex"><div className="px-4 py-3 bg-slate-800 rounded-l-xl text-blue-400 font-mono">{COUNTRIES.find(c => c.code === recipientForm.countryCode)?.flag} +{recipientForm.countryCode}</div><input type="tel" value={recipientForm.phone} onChange={e => setRecipientForm({ ...recipientForm, phone: e.target.value.replace(/\D/g, '') })} placeholder="545974262" className="flex-1 px-4 py-3 bg-[#0a0e1a] border border-slate-800 border-l-0 rounded-r-xl text-white font-mono" /></div></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setShowAddRecipient(false)} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
              <button type="button" onClick={addRecipient} disabled={saving || !recipientForm.name || !recipientForm.phone} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">{saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}Add</button>
            </div>
          </div>
        </div>
      )}

      {showQuickTest && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-[#0f1629] border border-slate-800 rounded-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6"><h3 className="text-xl font-bold flex items-center gap-2"><MessageCircle className="w-6 h-6 text-emerald-400" />Quick Test</h3><button onClick={() => { setShowQuickTest(false); setQuickTestResult(null); }} className="p-2 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button></div>
            <div className="flex gap-2 mb-6">
              <button type="button" onClick={() => setQuickTestForm({ ...quickTestForm, testType: 'text' })} className={`flex-1 py-3 rounded-xl border font-medium flex items-center justify-center gap-2 ${quickTestForm.testType === 'text' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 text-slate-400'}`}><MessageCircle className="w-5 h-5" />Text</button>
              <button type="button" onClick={() => setQuickTestForm({ ...quickTestForm, testType: 'image' })} className={`flex-1 py-3 rounded-xl border font-medium flex items-center justify-center gap-2 ${quickTestForm.testType === 'image' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-400'}`}><Image className="w-5 h-5" />Image</button>
            </div>
            <div className="space-y-5">
              <div><label className="text-sm text-slate-400 mb-2 block">Country</label><select value={quickTestForm.countryCode} onChange={e => setQuickTestForm({ ...quickTestForm, countryCode: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white">{COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} +{c.code} — {c.name}</option>)}</select></div>
              <div><label className="text-sm text-slate-400 mb-2 block">Phone</label><div className="flex"><div className="px-4 py-3 bg-slate-800 rounded-l-xl text-emerald-400 font-mono">{COUNTRIES.find(c => c.code === quickTestForm.countryCode)?.flag} +{quickTestForm.countryCode}</div><input type="tel" value={quickTestForm.phone} onChange={e => setQuickTestForm({ ...quickTestForm, phone: e.target.value.replace(/\D/g, '') })} placeholder="545974262" className="flex-1 px-4 py-3 bg-[#0a0e1a] border border-slate-800 border-l-0 rounded-r-xl text-white font-mono" /></div></div>
              {quickTestForm.testType === 'text' && <div><label className="text-sm text-slate-400 mb-2 block">Message</label><textarea value={quickTestForm.message} onChange={e => setQuickTestForm({ ...quickTestForm, message: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono text-sm resize-none" /></div>}
              {quickTestForm.testType === 'image' && (
                <>
                  <div><label className="text-sm text-slate-400 mb-2 block">S3 Bucket</label><input type="text" value={quickTestForm.bucket} onChange={e => setQuickTestForm({ ...quickTestForm, bucket: e.target.value })} className="w-full px-4 py-3 bg-[#0a0e1a] border border-slate-800 rounded-xl text-white font-mono" /></div>
                  <div>
                    <div className="flex items-center justify-between mb-2"><label className="text-sm text-slate-400">Select Image</label><button type="button" onClick={loadS3Images} disabled={loadingImages} className="text-xs text-blue-400">{loadingImages ? <Loader2 className="w-4 h-4 animate-spin" /> : '↻ Refresh'}</button></div>
                    {s3Images.length > 0 ? (
                      <div className="max-h-48 overflow-y-auto bg-[#0a0e1a] border border-slate-800 rounded-xl">
                        {s3Images.map((img, idx) => (
                          <button key={idx} type="button" onClick={() => setQuickTestForm({ ...quickTestForm, s3Key: img.key })} className={`w-full px-4 py-3 text-left border-b border-slate-800 last:border-0 hover:bg-slate-800 ${quickTestForm.s3Key === img.key ? 'bg-blue-500/20' : ''}`}>
                            <div className="flex items-center gap-3"><FileImage className={`w-5 h-5 ${quickTestForm.s3Key === img.key ? 'text-blue-400' : 'text-slate-500'}`} /><div className="flex-1 min-w-0"><div className="text-sm font-mono truncate">{img.name}</div></div>{quickTestForm.s3Key === img.key && <CheckCircle className="w-5 h-5 text-blue-400" />}</div>
                          </button>
                        ))}
                      </div>
                    ) : <div className="p-8 bg-[#0a0e1a] border border-slate-800 rounded-xl text-center text-slate-500">{loadingImages ? 'Loading...' : 'No images'}</div>}
                  </div>
                </>
              )}
              {quickTestResult && <div className={`p-4 rounded-xl border ${quickTestResult.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>{quickTestResult.success ? '✅ Sent!' : `❌ ${quickTestResult.error || 'Failed'}`}</div>}
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => { setShowQuickTest(false); setQuickTestResult(null); }} className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:bg-slate-800">Cancel</button>
              <button type="button" onClick={sendQuickTest} disabled={saving || !quickTestForm.phone} className={`flex-1 py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2 ${quickTestForm.testType === 'image' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'}`}>{saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN APP - HANDLES AUTH STATE
// ============================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('falconx_token');
    const savedUsername = localStorage.getItem('falconx_username');
    
    if (token && savedUsername) {
      // Verify token with API
      api('/auth/verify', { method: 'POST', body: JSON.stringify({ token }) })
        .then(data => {
          if (data.success && data.valid) {
            setIsAuthenticated(true);
            setUsername(savedUsername);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('falconx_token');
            localStorage.removeItem('falconx_username');
          }
        })
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const handleLogin = (token: string, user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('falconx_token');
    if (token) {
      await api('/auth/logout', { method: 'POST', body: JSON.stringify({ token }) });
    }
    localStorage.removeItem('falconx_token');
    localStorage.removeItem('falconx_username');
    setIsAuthenticated(false);
    setUsername('');
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard username={username} onLogout={handleLogout} />;
}