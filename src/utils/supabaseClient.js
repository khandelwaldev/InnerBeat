import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'Your database url';
const supabaseKey = 'Your database key';

export const supabase = createClient(supabaseUrl, supabaseKey);
