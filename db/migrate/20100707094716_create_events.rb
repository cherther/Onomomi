class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.date :event_date,  :null => false 
      t.integer :user_id, :null => false 
      t.integer :event_type_id, :null => false 
      t.integer :event_series_id
      t.integer :distance_category_id, :null => false 
      t.string :title,  :null => false 
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
