import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = "https://akofzoljrfwcflxtubjz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrb2Z6b2xqcmZ3Y2ZseHR1Ymp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMTA2ODYsImV4cCI6MjA2MzU4NjY4Nn0.lOq2jzlSGkD76zHpJbOHYHnJoYCAGoKNJtXy_Ti-6Xc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Manually override storage for auth persistence:
supabase.auth.storage = AsyncStorage;
