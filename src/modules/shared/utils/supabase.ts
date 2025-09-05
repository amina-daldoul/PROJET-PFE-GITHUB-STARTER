import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qxyrsnxgwxvzqqevdgvx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eXJzbnhnd3h2enFxZXZkZ3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDE1MDUsImV4cCI6MjA1OTg3NzUwNX0.UEnO9LJp5nhevoQ4houjPEwDSRrmpyc6abR5tiie7V4 '
)
export { supabase }
