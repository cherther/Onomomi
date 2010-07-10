class AccountController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:openid]
  before_filter :login_required, :only=>['logout']
  require 'rpx'
  helper :all
  def login
    @token_url = request.protocol + request.host + request.port_string + '/account/openid'
  end
  
  def openid
      token = params['token']
      return_url = params['return_url']
      url = 'https://rpxnow.com/'
      api_key = 'd8de77f783c05c95c85ac9d063f548f313953739'
      rpx = Rpx::RpxHelper.new api_key, url, ''
      @profile = rpx.auth_info token
      photo = @profile['photo'] 
      if photo != nil && photo != ''
        session['photo_url'] = photo
      else
        session['photo_url'] = gravatar_url_for(@profile['email'])
      end
      user = {
        :user_name => @profile['preferredUsername'], 
        :email => @profile['email'], 
        :identifier => @profile['identifier'],
        :first_name => @profile['name']['givenName'],
        :last_name => @profile['name']['familyName']
        }
      self.current_user = User.find_by_identifier(user[:identifier]) || 
        User.create!(user)
      
        redirect_to session[:return_to] || return_url || '/events'
  end
  
  def logout
    self.current_user = nil
    reset_session
    redirect_to '/events'
  end

  def register
  end

end
