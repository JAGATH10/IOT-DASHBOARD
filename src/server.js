
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vyuzcsnrtdazonleimsr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dXpjc25ydGRhem9ubGVpbXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Njg3MDMsImV4cCI6MjA0NjU0NDcwM30.7f2CDQfeaY_nwol3WxipLO71YABsBLsIdoWI8fBnT3g";    

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
