import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { DEFAULT_MISSIONS, Mission } from "../types/missions.type";

const MISSIONS_STORAGE_KEY = "@missions_state";

interface UseMissionsReturn {
  missions: Mission[];
  loading: boolean;
  completeMission: (missionId: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  unlockNextMission: () => void;
}

export const useMissions = (): UseMissionsReturn => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const storedMissions = await AsyncStorage.getItem(MISSIONS_STORAGE_KEY);

      if (storedMissions) {
        const parsedMissions = JSON.parse(storedMissions);
        setMissions(
          Array.isArray(parsedMissions) ? parsedMissions : DEFAULT_MISSIONS
        );
      } else {
        setMissions(DEFAULT_MISSIONS);
        await AsyncStorage.setItem(
          MISSIONS_STORAGE_KEY,
          JSON.stringify(DEFAULT_MISSIONS)
        );
      }
    } catch (error) {
      console.error("Erro ao carregar missões:", error);
      setMissions(DEFAULT_MISSIONS);
    } finally {
      setLoading(false);
    }
  };

  const completeMission = async (missionId: string): Promise<void> => {
    try {
      const updatedMissions = missions.map((mission) =>
        mission.id === missionId ? { ...mission, completed: true } : mission
      );

      setMissions(updatedMissions);

      // Desbloquear próxima missão
      const nextMissionIndex = updatedMissions.findIndex(
        (mission) => !mission.unlocked && !mission.completed
      );

      if (nextMissionIndex !== -1) {
        updatedMissions[nextMissionIndex] = {
          ...updatedMissions[nextMissionIndex],
          unlocked: true,
        };
        setMissions(updatedMissions);
      }

      // Persistir no AsyncStorage
      await AsyncStorage.setItem(
        MISSIONS_STORAGE_KEY,
        JSON.stringify(updatedMissions)
      );
    } catch (error) {
      console.error("Erro ao completar missão:", error);
    }
  };

  const unlockNextMission = () => {
    const nextMissionIndex = missions.findIndex(
      (mission) => !mission.unlocked && !mission.completed
    );

    if (nextMissionIndex !== -1) {
      const updatedMissions = missions.map((mission, index) =>
        index === nextMissionIndex ? { ...mission, unlocked: true } : mission
      );

      setMissions(updatedMissions);

      // Salvar no AsyncStorage
      AsyncStorage.setItem(
        MISSIONS_STORAGE_KEY,
        JSON.stringify(updatedMissions)
      );
    }
  };

  const resetProgress = async () => {
    try {
      setMissions(DEFAULT_MISSIONS);
      await AsyncStorage.setItem(
        MISSIONS_STORAGE_KEY,
        JSON.stringify(DEFAULT_MISSIONS)
      );
    } catch (error) {
      console.error("Erro ao resetar progresso:", error);
    }
  };

  return {
    missions,
    loading,
    completeMission,
    resetProgress,
    unlockNextMission,
  };
};
