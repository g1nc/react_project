require 'mina/rails'
require 'mina/git'
require 'mina/rvm'
require 'mina/puma'

set :rvm_use_path,     '/usr/share/rvm/scripts/rvm'
set :application_name, 'react_project'
set :domain,           '195.201.3.89'
set :deploy_to,        '/var/www/react_project'
set :repository,       'git@github.com:g1nc/react_project.git'
set :branch,           'master'
set :user,             'deploy'

# Shared dirs and files will be symlinked into the app-folder by the 'deploy:link_shared_paths' step.
# Some plugins already add folders to shared_dirs like `mina/rails` add `public/assets`, `vendor/bundle` and many more
# run `mina -d` to see all folders and files already included in `shared_dirs` and `shared_files`
# set :shared_dirs,  fetch(:shared_dirs,  []).push('public/packs')
set :shared_files, fetch(:shared_files, []).push('config/database.yml',
                                                 'config/secrets.yml',
                                                 'config/puma.rb',
                                                 '.env')

task :remote_environment do
  invoke :'rvm:use', 'ruby-2.4.2@default'
end

# Put any custom commands you need to run at setup
# All paths in `shared_dirs` and `shared_paths` will be created on their own.
task :setup do
  command %[touch "#{fetch(:shared_path)}/config/database.yml"]
  command %[touch "#{fetch(:shared_path)}/config/secrets.yml"]
  command %[touch "#{fetch(:shared_path)}/config/puma.rb"]
  command %[touch "#{fetch(:shared_path)}/.env"]
  comment "Be sure to edit '#{fetch(:shared_path)}/config/database.yml', 'secrets.yml' and puma.rb."
end

desc "Deploys the current version to the server."
task :deploy do
  # invoke :'git:ensure_pushed'
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    on :launch do
      invoke :'puma:phased_restart'
    end
  end
end