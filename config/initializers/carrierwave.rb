require 'carrierwave/storage/abstract'
require 'carrirewave/storage/file'
require 'carrirewave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider: 'AWS',
    aws_acess_key_id: Rails.application.secrets.aws_access_key_id,
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    region: 'ap-northeast-1'
  }

  config.fog_directory = 'saori3chatspace'
  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/saori3chatspace'
end