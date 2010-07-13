# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#   
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Major.create(:name => 'Daley', :city => cities.first)

DistanceCategory.create([
  { :name => 'Marathon', :event_type_id => 1 },
  { :name => 'Half-Marathon', :event_type_id => 1  }, 
  { :name => '10K', :event_type_id => 1  }, 
  { :name => '5K', :event_type_id => 1  }, 
  { :name => 'Criterion', :event_type_id => 2  }, 
  { :name => 'Century Ride', :event_type_id => 2  }, 
  { :name => 'Ironman', :event_type_id => 3  }, 
  { :name => '70.3', :event_type_id => 3  }, 
  { :name => 'Olympic', :event_type_id => 3  },
  { :name => 'Other', :event_type_id => 0  }, 
  ])
EventType.create([{:name => 'Running'},{:name => 'Cycling'},{:name => 'Triathlon'}])

@running = EventType.find(:first, :conditions => "name = 'Running'")
@marathon = DistanceCategory.find(:first, :conditions => "name = 'Marathon'")
@tenK = DistanceCategory.find(:first, :conditions => "name = '10K'")

Event.create([
  { 
  :event_date => '2010-11-14', 
  :user_id => 1, 
  :event_type_id => @running.id, 
  :distance_category_id => @marathon.id, 
  :title => 'Malibu Marathon', 
  :description => 'Annual Malibu Marathon',
  :start_address => 'Malibu, CA, USA',
  :start_lat => 34.005,
  :start_lng => -118.81
  },
  { 
  :event_date => '2011-03-20', 
  :user_id => 1, 
  :event_type_id => @running.id, 
  :distance_category_id => @marathon.id, 
  :title => 'LA Marathon', 
  :description => 'Honda LA Marathon presented by K-SWISS',
  :start_address => 'Dodger Stadium, Los Angeles, CA, United States',
  :start_lat => 34.0754,
  :start_lng => -118.491
    },
    { 
    :event_date => '2011-01-01', 
    :user_id => 1, 
    :event_type_id => @running.id, 
    :distance_category_id => 2, 
    :title => 'Munich Stadtlauf Half-Marathon', 
    :description => 'Munich Stadtlauf Half-Marathon',
    :start_address => 'Marienplatz, Munich, Germany ',
    :start_lat => 48.1378,
    :start_lng => 11.5759
    }
    { 
    :event_date => '2011-03-20', 
    :user_id => 1, 
    :event_type_id => @running.id, 
    :distance_category_id => @marathon.id, 
    :title => 'Honolulu Marathon ', 
    :description => 'Honolulu Marathon  ',
    :start_address => 'Honolulu, HI, USA',
    :start_lat => 21.3069,
    :start_lng => -157.858
      }
        ])