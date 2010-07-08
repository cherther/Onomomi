class AddLocationToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :start_address, :string, :null => false
    add_column :events, :start_lat, :float
    add_column :events, :start_lng, :float
    add_column :events, :end_address, :string
    add_column :events, :end_lat, :float
    add_column :events, :end_lng, :float
    add_column :events, :route, :text
  
  end

  def self.down
    remove_column :events, :start_address
    remove_column :events, :start_lat
    remove_column :events, :start_lng
    remove_column :events, :end_address
    remove_column :events, :end_lat
    remove_column :events, :end_lng
    remove_column :events, :route
  end
end
