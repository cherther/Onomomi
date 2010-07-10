class User < ActiveRecord::Base
  has_many :events
  has_many :eventseries
  
  def friendly
    first_name != nil ? first_name : user_name 
  end
  

end
