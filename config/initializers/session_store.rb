# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_onomomi_session',
  :secret      => 'a3ec623e0b11b44af627c4affc4a41a355121e2dc2ce2132ded3882b0af3cdaf179da8175a083c675e820ce78372d03d37af0b1a1a6ad0d2a102a8970ac7c325'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
