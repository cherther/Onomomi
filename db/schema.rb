# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100708113218) do

  create_table "distance_categories", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "event_series", :force => true do |t|
    t.integer  "user_id",     :null => false
    t.string   "title",       :null => false
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "event_types", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", :force => true do |t|
    t.date     "event_date",           :null => false
    t.integer  "user_id",              :null => false
    t.integer  "event_type_id",        :null => false
    t.integer  "event_series_id"
    t.integer  "distance_category_id", :null => false
    t.string   "title",                :null => false
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "start_address",        :null => false
    t.float    "start_lat"
    t.float    "start_lng"
    t.string   "end_address"
    t.float    "end_lat"
    t.float    "end_lng"
    t.text     "route"
  end

end
