# VINCE Changelog

## Version 1.50.6: 2022-11-04

* Allow Vendor Association when Ticket is associated with a Case
* Adding Download HTML per INL request GH Issue #60
* Avoid Alert severity colors to buttons that don't do deletes/sensitive actions - UI feedback.
* Show MFA type for users in VinceTrack to support troubleshooting Users
* Catch errors on failure to email when a Post is submitted.

## Version 1.50.5: 2022-10-25

* Updates to settings_.py to match public GitHub
* UI tweaks for Loading div, asynchronous search via delaySearch
* Add Access-Control-Origin header to CSAF output for Secvisogram
* Fix Python Pickle Code Injection vulnerability reported by Rapid7 researcher Marcus Chang CVE-2022-40238
* Address reported failure with better error reporting from Encrypt-and-Send
* Avoid TimeZone spurious warning errors flooding logs

## Version 1.50.4: 2022-10-05

* UI improvements for vincetrack for search experience
* Performance tweaks for Tickets search use $queryset.count() instead len($queryset) when pagination is used
* Fix HTML injection vulnerabilities reported by Rapid7 researcher Nick Sanzotta (CVE-2022-40248,CVE-2022-40257)


## Version 1.50.3: 2022-09-16

* Full support for CSAF 2.0 export of vulnerability Case
* Fix for a number of Views to avoid digit parameter confusion
* Add view CSAF and VINCE JSON to support download of Case data in machine-readable format
* If upgrading, make sure you verify settings.py has new variables `CONTACT_PHONE` `ORG_POLICY_URL` and `ORG_AUTHORITY` populated.


## Version 1.50.2: 2022-08-29

* Resolves issue of enumerating user_id and group_id - reported by Sharon Brizinov of Claroty Research [#51](https://github.com/CERTCC/VINCE/issues/51)
* Removed lxml library no longer in use in requirements.txt - reported by dependabot via [#38](https://github.com/CERTCC/VINCE/pull/38)
* Add [DISABLED] Keyword for users in `inactive` status in vincetrack `Teams` menu view.


## Version 1.50.1: 2022-08-08

* BugFix for API key generation issue. The generate_key method was disabled accidentally


## Version 1.50.0: 2022-07-19

* New MFA reset workflow
* Allow comments when re-assigning tickets
* Sorting improvements on VINCEComm Dashboard
* Add Vul Note download button in VINCETrack
* Fixed open redirect vulnerability (CVE-2022-25799)[https://nvd.nist.gov/vuln/detail/CVE-2022-25799] reported by Jonathan Leitschuh   [#45](https://github.com/CERTCC/VINCE/issues/45)
* Bug Fixes

## Version 1.49.0: 2022-07-19

* Contact Management Updates
* Dependency Upgrades
* Bug Fixes

## Version 1.48.0: 2022-05-13

* Initial Open Source Release
