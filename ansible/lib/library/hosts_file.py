#!/usr/bin/python
# -*- coding: utf-8 -*-

DOCUMENTATION = '''
---
module: hosts_file
short_description: Manage entries in /etc/hosts.
description:
    - This module manages hosts file items
version_added: "2.1"
options:
    name:
        description:
            - FQDN (ex. example.com).
        required: true
        default: null
        aliases: [ 'key' ]
    ip:
        description:
            - IP address.
        required: false
        default: 127.0.0.1
    state:
        description:
            - Presence of the entry in the hosts file.
        choices: [ "present", "absent" ]
        default: present
    file:
        description:
            - Only if the path is different from /etc/hosts
        required: false
        default: /etc/hosts
    reload: _DElETE
notes: []
requirements: []
author: ""
'''

EXAMPLES = '''
# Set 127.0.0.1 example.com in /etc/hosts
- sysctl:
    name: example.com
    ip: 127.0.0.1

# Remove example.com from /etc/hosts
- sysctl:
    name: example.com
    state: absent
'''

# ==============================================================

import os
import tempfile

class HostsFileModule(object):

    def __init__(self, module):
        self.module = module
        self.args = self.module.params

        self.hosts_file = self.args['file']

        self.hostname = self.args['name'].strip()
        self.ip = self.args['ip'].strip()
        self.file_lines = []
        self.new_lines = []
        self.changed = False
        self.process()

    def process(self):

        self.read_hosts_file()

        if self.args['state'] == "absent":
            self.remove_host()
        else:
            self.set_host()


        if not self.module.check_mode and self.changed:
            self.write_hosts()

    def remove_host(self):

        for line in self.file_lines:
            if not line or line.startswith('#'):
                self.new_lines.append(line)
                continue

            items = line.split()
            ip = items[0]
            hosts = items[1:]

            if self.hostname not in hosts:
                self.new_lines.append(line)
                continue

            if len(hosts) > 1:
                other_hosts = ' '.join([_host for _host in hosts if self.hostname != _host])
                self.new_lines.append("{ip: <15} {other_hosts}".format(ip=ip, other_hosts=other_hosts))

            self.changed = True

    def set_host(self):
        host_found = False

        for line in self.file_lines:

            if not line or line.startswith('#'):
                self.new_lines.append(line)
                continue

            items = line.split()
            ip = items[0]
            hosts = items[1:]
            if self.hostname in hosts:

                if host_found:
                    if len(hosts) > 1:
                        other_hosts = ' '.join([_host for _host in hosts if self.hostname != _host])
                        self.new_lines.append("{ip: <15} {other_hosts}".format(ip=ip, other_hosts=other_hosts))
                    self.changed = True
                    continue

                host_found = True
                if ip == self.ip:
                    self.new_lines.append(line)
                    continue

                if len(hosts) == 1:
                    self.new_lines.append("{ip: <15} {hostname}".format(ip=self.ip, hostname=self.hostname))
                else:
                    other_hosts = ' '.join([_host for _host in hosts if self.hostname != _host])
                    self.new_lines.append("{ip: <15} {other_hosts}".format(ip=ip, other_hosts=other_hosts))
                    self.new_lines.append("{ip: <15} {hostname}".format(ip=self.ip, hostname=self.hostname))
                self.changed = True
            else:
                self.new_lines.append(line)

        if not host_found:
            self.new_lines.append("{ip: <15} {hostname}".format(ip=self.ip, hostname=self.hostname))
            self.changed = True

    def read_hosts_file(self):

        lines = []
        try:
            with open(self.hosts_file, "r") as f:
                lines = f.readlines()
        except IOError:
            e = get_exception()
            self.module.fail_json(msg="Failed to open %s: %s" % (self.hosts_file, str(e)))

        for line in lines:
            line = line.strip()
            self.file_lines.append(line)

    def write_hosts(self):

        fd, tmp_path = tempfile.mkstemp('.conf', '.ansible_m_hosts_', os.path.dirname(self.hosts_file))

        try:
            with open(tmp_path, "w") as f:
                for line in self.new_lines:
                    f.write(line.strip() + "\n")
        except IOError:
            e = get_exception()
            self.module.fail_json(msg="Failed to write to file %s: %s" % (tmp_path, str(e)))

        self.module.atomic_move(tmp_path, self.hosts_file)


def main():
    # defining module
    module = AnsibleModule(
        argument_spec=dict(
            name=dict(aliases=['key'], required=True),
            ip=dict(aliases=['val'], required=False, type='str', default="127.0.0.1"),
            state=dict(default='present', choices=['present', 'absent']),
            file=dict(default='/etc/hosts', type='path')
        ),
        supports_check_mode=True
    )

    result = HostsFileModule(module)

    module.exit_json(changed=result.changed)


# import module snippets
from ansible.module_utils.basic import *

if __name__ == '__main__':
    main()