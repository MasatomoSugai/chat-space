require 'rails_helper'

describe Message do
  describe '#create' do
    it "is valid with a message" do
      message = build(:message, image:"")
      expect(message).to be_valid
    end

    it "is valid with an image" do
      message = build(:message, content:"")
      expect(message).to be_valid
    end

    it "is invalid without a message and an image" do
      message = build(:message, content:"", image:"")
      message.valid?
      expect(message.errors[:content][0]).to include("を入力してください")
    end

    it "is invalid without a group_id" do
      message = build(:message, group_id:"")
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "is invalid without user_id" do
      message = build(:message, user_id:"")
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
    



  end
end
