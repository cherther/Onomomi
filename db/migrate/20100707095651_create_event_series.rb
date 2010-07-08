class CreateEventSeries < ActiveRecord::Migration
  def self.up
    create_table :event_series do |t|
      t.integer :user_id, :null => false
      t.string :title, :null => false
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :event_series
  end
end
