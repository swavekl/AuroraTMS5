package org.auroratms.player

import org.auroratms.User

//
// group of players can be used for quick entry of family members or university team
// and make one payment for all entries
//
class PlayerGroup {
    // name of group e.g. 'Lorenc Family' or 'Lindenwood University Team'
    String name

    // if family we can find other members and copy their address when creating a profile
    enum Type {
        Family, Team
    }
    // type of group
    Type type;

    // it belongs to one user and no reference to it
    static belongsTo = User

    static hasMany = [groupMembers:PlayerGroupMember]

    static constraints = {
        name blank:false, maxSize: 40
    }
}