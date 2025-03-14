#########################################################################
# VINCE
#
# Copyright 2022 Carnegie Mellon University.
#
# NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING
# INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON
# UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
# AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR
# PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE
# MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND
# WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
#
# Released under a MIT (SEI)-style license, please see license.txt or contact
# permission@sei.cmu.edu for full terms.
#
# [DISTRIBUTION STATEMENT A] This material has been approved for public
# release and unlimited distribution.  Please see Copyright notice for non-US
# Government use and distribution.
#
# Carnegie Mellon®, CERT® and CERT Coordination Center® are registered in the
# U.S. Patent and Trademark Office by Carnegie Mellon University.
#
# This Software includes and/or makes use of Third-Party Software each subject
# to its own license.
#
# DM21-1126
########################################################################
from .apps import VinceCommConfig

def is_in_group_vincecomm(user):
    return user.groups.filter(name=VinceCommConfig.name).exists() 

def is_in_group_vincegroupadmin(user):
    return user.groups.filter(name="vince_group_admin").exists()

def is_in_group_vincetrack(user):
    return user.groups.filter(name='vincetrack').exists()

def is_in_group_vincelimited(user):
    return user.groups.filter(name='vince_limited').exists()

def is_not_pending(user):
    return not(user.vinceprofile.pending)

def group_case(user, case):
    from .models import CaseMember
    groups = user.groups.exclude(groupcontact__isnull=True)
    casemembers = CaseMember.objects.filter(case=case, group__in=groups).first()
    if casemembers:
        return casemembers.group.name
    else:
        return "Participant"
