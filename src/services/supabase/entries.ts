import { supabase } from './client';
import type { Database } from '../../types/supabase';

type Entry = Database['public']['Tables']['entries']['Row'];
type EntryInsert = Database['public']['Tables']['entries']['Insert'];

export const createEntry = async (entryData: EntryInsert): Promise<Entry | null> => {
  const { data, error } = await supabase
    .from('entries')
    .insert(entryData)
    .select()
    .single();

  if (error) {
    console.error('Error creating entry:', error);
    throw error;
  }

  return data;
};

export const getDailyEntries = async (date: string): Promise<Entry[]> => {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('entry_date', date);

  if (error) {
    console.error('Error fetching daily entries:', error);
    return [];
  }

  return data;
};