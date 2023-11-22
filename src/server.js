
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zmlsceuzzabvkppxzyku.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbHNjZXV6emFidmtwcHh6eWt1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjU5NTA0MCwiZXhwIjoyMDA4MTcxMDQwfQ.X9ySlHUAHRRFYqftQhcNBzcuS6Qp3Dl5Qw-aJ6xpVD0";    

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;