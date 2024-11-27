export interface Profile {
  name: string;
  email: string;
  age?: number;
}

const PROFILE_KEY = "userProfiles";

const getProfilesFromLocalStorage = (): Profile[] => {
  const profiles = localStorage.getItem(PROFILE_KEY);
  return profiles ? JSON.parse(profiles) : [];
};

const saveProfilesToLocalStorage = (profiles: Profile[]): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
};

export const api = {
  // Save or update a profile
  saveProfile: async (profile: Profile) => {
    return new Promise<Profile>((resolve, reject) => {
      setTimeout(() => {
        const profiles = getProfilesFromLocalStorage();
        const existingIndex = profiles.findIndex(
          (p) => p.email === profile.email
        );

        if (existingIndex !== -1) {
          // Update existing profile
          profiles[existingIndex] = profile;
        } else {
          // Add new profile
          profiles.push(profile);
        }

        saveProfilesToLocalStorage(profiles);
        resolve(profile);
      }, 1000); // Simulate network delay
    });
  },

  // Fetch all profiles (For listing purposes)
  fetchProfiles: async () => {
    return new Promise<Profile[]>((resolve) => {
      setTimeout(() => {
        resolve(getProfilesFromLocalStorage());
      }, 1000); // Simulate network delay
    });
  },

  // Fetch a single profile
  fetchProfile: async (email: string) => {
    return new Promise<Profile>((resolve, reject) => {
      setTimeout(() => {
        const profiles = getProfilesFromLocalStorage();
        const profile = profiles.find((p) => p.email === email);

        if (profile) {
          resolve(profile);
        } else {
          reject(new Error("Profile not found."));
        }
      }, 1000); // Simulate network delay
    });
  },

  // Delete a profile
  deleteProfile: async (email: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const profiles = getProfilesFromLocalStorage();
        const updatedProfiles = profiles.filter((p) => p.email !== email);

        if (profiles.length === updatedProfiles.length) {
          reject(new Error("Profile not found."));
        } else {
          saveProfilesToLocalStorage(updatedProfiles);
          resolve("Profile deleted successfully.");
        }
      }, 1000); // Simulate network delay
    });
  },
};
