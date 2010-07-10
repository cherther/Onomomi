# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def openid_url
    'localhost/account/openid'
  end
  def token_url
    request.protocol + request.host + request.port_string + '/account/openid'
  end
  require 'digest/md5'
  def gravatar_url_for(email, options = {})      
   url_for(
   { :gravatar_id => Digest::MD5.hexdigest(email), 
     :host => 'www.gravatar.com/avatar/',
     :protocol => 'http://', 
     :only_path => false 
     }.merge(options))  
   end

   def pretty_date(date)
     date.strftime("%A, %B %d, %Y")
   end
end
