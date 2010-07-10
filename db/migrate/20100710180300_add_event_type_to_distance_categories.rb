class AddEventTypeToDistanceCategories < ActiveRecord::Migration
  def self.up
    add_column :distance_categories, :event_type_id, :integer, :null => false, :default => 0
  end

  def self.down
    remove_column :distance_categories, :event_type_id
  end
end
