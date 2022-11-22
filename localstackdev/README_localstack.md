## Localstack installation
### Dependencies
First install:
- [Docker](https://get.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/install/)
- git

Then clone down this repository and `cd` into it.

### Configuration
Then acquire a valid [Localstack](https://localstack.cloud/) Pro license key (trial will work)

Modify the `LOCALSTACK_API_KEY variable` in `.env` to be proper API key.

Add `test-bucket.s3.us-east-1.localhost` to `/etc/hosts`. An example line is below:

    127.0.1.1   test-bucket.s3.us-east-1.localhost


### Usage
Run the `./fresh.sh` script, and wait 1-2 minutes

Navigate to `http://localhost`


### Additional commands
Commands of note are below:
- `docker-compose rm` (remove existing "down" containers)
- `docker-compose logs` (show logs for all containers)
- `docker-compose build` (rebuild vince base container)
- `docker-compose up -d` (run in the background)
- `docker-compose ps` (show status of containers)
- `docker-compose exec <name_of_container> /bin/bash` (start a bash shell in a running container)


## Additional notes
- if a poetry .venv is located in the same directory as the vince install, remove it before attempting to launch vince as it will attempt to use that virtual environment, which will result in a broken state.
- both Windows and macOS do not support the "host" networking mode for docker the compose file will need to be modifed to use a standard network along with aliases to allows resolution of the proper host names
- In the current configuration `localhost` is one the few values in the allowed_hosts, if remote access is needed then the VINCE_XXX_DOMAIN lines in `./bigvince/.env` will need to be modified to accommodate
- Multiurl is currently disabled
- MFA is currently disabled
- The default google recaptcha keys will always return "valid"