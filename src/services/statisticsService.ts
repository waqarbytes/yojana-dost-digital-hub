
import { create } from 'zustand';

interface Statistics {
  centralDepartments: number;
  stateDepartments: number;
  services: number;
  registrations: number;
  schemeApplications: number;
  eligibilityChecks: number;
}

interface StatisticsStore {
  stats: Statistics;
  incrementRegistrations: () => void;
  incrementServices: () => void;
  incrementSchemeApplications: () => void;
  incrementEligibilityChecks: () => void;
}

// Initial statistics
const baseStats: Statistics = {
  centralDepartments: 36,
  stateDepartments: 96,
  services: 428,
  registrations: 13600000,
  schemeApplications: 4256,
  eligibilityChecks: 8745,
};

export const useStatisticsStore = create<StatisticsStore>((set) => ({
  stats: baseStats,
  incrementRegistrations: () => 
    set((state) => ({
      stats: {
        ...state.stats,
        registrations: state.stats.registrations + Math.floor(Math.random() * 5) + 1
      }
    })),
  incrementServices: () => 
    set((state) => ({
      stats: {
        ...state.stats,
        services: state.stats.services + 1
      }
    })),
  incrementSchemeApplications: () => 
    set((state) => ({
      stats: {
        ...state.stats,
        schemeApplications: state.stats.schemeApplications + 1
      }
    })),
  incrementEligibilityChecks: () => 
    set((state) => ({
      stats: {
        ...state.stats,
        eligibilityChecks: state.stats.eligibilityChecks + 1
      }
    })),
}));
