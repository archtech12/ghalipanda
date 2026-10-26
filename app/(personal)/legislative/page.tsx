'use client'

import {useState} from 'react'
import Link from 'next/link'
import { legislativeData } from '@/lib/legislative'

export default function LegislativeWorkPage() {
  
  // Policy positions based on the provided information
  const policyPositions = [
    {
      id: 1,
      title: 'Economic Justice',
      description:
        "Opposing anti-people tax policies and advocating for economic measures that protect the purchasing power of the poor.",
      icon: 'balance',
    },
    {
      id: 2,
      title: 'Rural Development',
      description:
        'Championing federal projects for roads, electrification, and clean water in Gaya, Ajingi, and Albasu Federal Constituency.',
      icon: 'landscape',
    },
    {
      id: 3,
      title: 'Youth & Women Empowerment',
      description:
        'Legislating for funds and programs that provide capital and skills training for self-reliance.',
      icon: 'groups',
    },
    {
      id: 4,
      title: 'Education & Health',
      description:
        'Prioritizing budgetary allocations for healthcare facilities and scholarship schemes.',
      icon: 'school',
    },
  ]

  return (
    <div className="w-full">
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-black text-white overflow-hidden pb-16 pt-20 lg:pt-28">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6 animate-fade-in-up">
             <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
             <span className="text-xs font-bold uppercase tracking-widest text-green-100">Legislative Agenda</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
            The People's <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-200">Voice</span>
          </h1>
          
          <p className="text-lg md:text-xl text-green-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Driving impactful change through robust legislation. Advocating for policies that protect the vulnerable, empower the youth, and strengthen the economy.
          </p>

          <div className="max-w-3xl mx-auto glass-panel p-6 rounded-2xl mb-12 text-left">
             <p className="mb-4">
              Hon. Dr. Ghali Panda's legislative actions are defined by a pro-people agenda. He fearlessly voices the
              concerns of the common man, particularly regarding economic policies that impact rural
              livelihoods. His priorities include agricultural support, infrastructural development, and
              equitable tax policies.
            </p>
            <p>
              He has been a vocal critic of poorly timed economic reforms that place undue burden on ordinary
              Nigerians without adequate safety nets.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 border-t border-white/10 pt-10">
              {[
                  { label: 'Bills Proposed', value: '12+', icon: 'description' },
                  { label: 'Motions Moved', value: '08', icon: 'gavel' },
                  { label: 'Communities Impacted', value: '45+', icon: 'groups' },
                  { label: 'Years of Service', value: '04', icon: 'verified' }
              ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="material-symbols-outlined text-green-400 text-3xl mb-2">{stat.icon}</span>
                      <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-green-200 uppercase tracking-wider">{stat.label}</div>
                  </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              Policy <span className="text-green-700">Pillars</span>
            </h2>
            <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Key legislative priorities focused on sustainable development and social equity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policyPositions.map((position) => (
              <div
                key={position.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 hover:border-green-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:bg-green-600 transition-colors duration-300 shadow-sm group-hover:shadow-green-500/30">
                  <span className="material-symbols-outlined text-green-700 text-3xl group-hover:text-white transition-colors">
                    {position.icon}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-800 transition-colors relative z-10">
                  {position.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{position.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] bg-gray-50 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-green-50 rounded-full blur-[100px]"></div>
         </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-2 block">Track Record</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              Legislative <span className="text-green-700">Timeline</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A transparent view of ongoing and passed bills, motions, and parliamentary interventions.
            </p>
          </div>

          <div className="relative">
             {/* Timeline Line */}
             <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-green-500 to-green-200 hidden md:block"></div>

            <div className="space-y-12">
              {legislativeData && legislativeData.length > 0 ? (
                legislativeData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content Card */}
                    <div className="flex-1 w-full">
                         <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 group">
                             <div className="flex items-center justify-between mb-3">
                                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.date}</span>
                                 <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                                    item.status === 'Proposed'
                                      ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                      : item.status.includes('Committee')
                                        ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                        : item.status === 'Passed' || item.status === 'Completed' || item.status === 'Executed'
                                          ? 'bg-green-50 text-green-600 border border-green-100'
                                          : 'bg-gray-50 text-gray-600 border border-gray-100'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                      item.status === 'Passed' || item.status === 'Completed' || item.status === 'Executed' ? 'bg-green-500 animate-pulse' : 
                                      item.status.includes('Committee') ? 'bg-amber-500' : 'bg-gray-400'
                                  }`}></span>
                                  {item.status}
                                </span>
                             </div>
                             <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                                {item.title}
                             </h3>
                             <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.description}</p>
                             <p className="text-gray-400 text-xs italic">{item.titleHA}</p>
                         </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-green-600 border-4 border-white shadow-md flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    {/* Spacer for alternate side */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl">
                  No legislative actions to display.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-900 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-400">
                 <span className="material-symbols-outlined text-4xl">format_quote</span>
             </div>
             
             <blockquote className="text-2xl md:text-4xl font-serif font-medium leading-relaxed mb-10 text-white/90">
                "True representation is standing firmly with the ordinary citizen. Every bill, motion, and intervention must directly improve livelihoods, rural infrastructure, and educational opportunities across our communities."
             </blockquote>

             <div className="flex items-center justify-center gap-4 mb-12">
                 <div className="w-12 h-1 bg-green-600 rounded-full"></div>
                 <div className="text-sm font-bold uppercase tracking-widest text-green-400">Hon. Dr. Ghali Panda</div>
                 <div className="w-12 h-1 bg-green-600 rounded-full"></div>
             </div>

             <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
                 <h3 className="text-xl font-bold mb-4">Join the Movement</h3>
                 <p className="text-gray-400 mb-6">Support our legislative agenda for a better Nigeria.</p>
                 <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-500 hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all transform hover:-translate-y-1"
                >
                  Contact Office <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
             </div>
        </div>
      </section>
    </div>
  )
}

