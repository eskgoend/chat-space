FactoryBot.define do

  factory :message do
    content          {Faker::Lorem.sentence}
    image            {File.open("#{Rails.root}/public/uploads/sample1.JPG")}
    user             
    group            
  end

end