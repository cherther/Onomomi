class Event < ActiveRecord::Base
  belongs_to :distantcategory
  belongs_to :eventseries
  belongs_to :eventtype
end
