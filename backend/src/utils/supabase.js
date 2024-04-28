const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const publicKey = process.env.SUPABASE_PUBLIC_KEY;

const supabase = createClient(url, publicKey);

module.exports = { supabase };
