class CreateDistanceCategories < ActiveRecord::Migration
  def self.up
    create_table :distance_categories do |t|
      t.string :name, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :distance_categories
  end
end
