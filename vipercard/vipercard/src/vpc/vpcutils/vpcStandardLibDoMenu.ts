
/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * if code here needs special abilities, we'll call
 * internalvpcmessagesdirective, which can do anything.
 *
 * in the same scope as vpcStandardLibScript and can call anything there.
 */
export const VpcStandardLibDoMenu = /* static class */ {
    script: `

on vpcinternaluntrappabledomenu itemName, pb
    if the shiftKey is down then
        domenu itemName, pb
    else
        send ("domenu "&quote&itemName&quote&", "&quote&pb&quote) to this cd
    end if
end vpcinternaluntrappabledomenu

on domenu itemName, pb
    global doMenuResult
    put "" into doMenuResult
    put tolowercase(itemName) into pl
    if "|" is in pl then
        errordialog ("not a valid domenu" && pl)
    end if
    put false into handled
    put "|" & pl & "|" into key
    if not handled then put domenu_edit(key, pl, pb) into handled
    if not handled then put domenu_movecard(key, pl, pb) into handled
    if not handled then put domenu_object(key, pl, pb) into handled
    if not handled then put domenu_paintsetting(key, pl, pb) into handled
    if not handled then put domenu_changefont(key, pl, pb) into handled
    if not handled then put domenu_changefontsize(key, pl, pb) into handled
    if not handled then put domenu_changefontstyle(key, pl, pb) into handled
    if not handled then put domenu_changefontalign(key, pl, pb) into handled
    if not handled then
        errorDialog ("Unknown domenu" && pl)
    end if
    return doMenuResult
end domenu

on domenu_edit key, pl, pb
    global doMenuResult
    put true into ret
    if pl == "clear" then
        put the selectedfield into theFld
        if theFld is not empty then
            put "" into the selection
            select before text of theFld
        end if
    else
        put false into ret
    end if
    return ret
end domenu_edit

on domenu_object key, pl, pb
    global doMenuResult
    put true into ret
    if pl == "new button" or pl == "new button from ui" then
        send "newButton" to this cd
        put "btn" into sendParam
        if "from ui" is in pl then put "fromui" after sendParam
        internalvpcmessagesdirective "makevelwithoutmsg" sendParam
        put sendParam into doMenuResult
    else if pl == "new field" or pl == "new field from ui" then
        send "newField" to this cd
        put "fld" into sendParam
        if "from ui" is in pl then put "fromui" after sendParam
        internalvpcmessagesdirective "makevelwithoutmsg" sendParam
        put sendParam into doMenuResult
    else if pl == "new background" then
        send "newBackground" to this stack
        put "bkgnd" into sendParam
        internalvpcmessagesdirective "makevelwithoutmsg" sendParam
        put sendParam into doMenuResult
        go cd 1 of bkgnd id doMenuResult
    else if pl == "new card" then
        send "newCard" to this cd
        put "card" into sendParam
        internalvpcmessagesdirective "makevelwithoutmsg" sendParam
        put sendParam into doMenuResult
        go cd id doMenuResult
    else if pl == "duplicate card paint" then
        send "newCard" to this cd
        put "dupecardpaint" into sendParam
        internalvpcmessagesdirective "makevelwithoutmsg" sendParam
        put sendParam into doMenuResult
        go cd id doMenuResult
    else if pl == "paste card or vel" then
        put "" into sendParam
        internalvpcmessagesdirective "pastecardorvel" sendParam
        put sendParam into doMenuResult
    else if pl == "delete card" then
        delete this card
    else
        put false into ret
    end if
    return ret
end domenu_object

on domenu_movecard key, pl, pb
    put true into ret
    if pl == "back" then
        go back
    else if pl == "home" then
        go to card 1
    else if pl == "help" then
        send "help" to this card
    else if pl == "recent" then
        go recent
    else if pl == "first" then
        go first
    else if pl == "last" then
        go last
    else if pl == "prev" or pl == "previous" then
        if pb == "FromUI" and the number of this cd is 1 then
            answer "You are already at the first card."
        else
            go prev
        end if
    else if pl == "next" then
        if pb == "FromUI" and the number of this cd >= the number of cds in this stack then
            answer "You are at the last-most card. You can create a new card by selecting 'New Card' from the Edit menu."
        else
            go next
        end if
    else
        put false into ret
    end if
    return ret
end domenu_movecard

on domenu_paintsetting key, pl, pb
    global doMenuResult
    put true into ret
    if pl == "wide lines" then
        if the linesize is 1 then
            set the linesize to 2
        else
            set the linesize to 1
        end if
    else if pl == "black lines" then
        -- DrawPatterns_clrBlack
        set the linecolor to 0
    else if pl == "white lines" then
        -- DrawPatterns_clrWhite
        set the linecolor to 1
    else if pl == "no fill" then
        set the filled to false
    else if pl == "black fill" then
        set the filled to true
    else if pl == "white fill" then
        set the filled to "white"
    else if pl == "draw multiple" then
        set the multiple to (not the multiple)
    else
        put false into ret
    end if
    return ret
end domenu_paintsetting

on domenu_changefont key, pl, pb
    put "|chicago|courier|geneva|new york|times|helvetica|monaco|symbol|" into keys
    if key is in keys then
        domenu_exitifcompatmodeenabled
        if "setAll|" is in pb then
            replace "setAll|" with "" in pb
            set the textfont of pb to pl
        else
            set the textfont of the selectedchunk to pl
        end if
        return true
    else
        return false
    end if
end domenu_changefont

on domenu_changefontsize key, pl, pb
    put "|9|10|12|14|18|24|" into keys
    if key is in keys then
        domenu_exitifcompatmodeenabled
        if "setAll|" is in pb then
            replace "setAll|" with "" in pb
            set the textsize of pb to pl
        else
            set the textsize of the selectedchunk to pl
        end if
        return true
    else
        return false
    end if
end domenu_changefontsize

on domenu_changefontstyle key, pl, pb
    put "|plain|bold|italic|underline|outline|condense|extend|grayed|" into keys
    if key is in keys then
        domenu_exitifcompatmodeenabled
        if "setAll|" is in pb then
            replace "setAll|" with "" in pb
            if pl == "plain" then
                set the textstyle of pb to plain
            else
                set the textstyle of pb to "toggle-" & pl
            end if
        else if pl == "plain" then
            set the textstyle of the selectedchunk to plain
        else
            set the textstyle of the selectedchunk to "toggle-" & pl
        end if
        return true
    else
        return false
    end if
end domenu_changefontstyle

on domenu_changefontalign key, pl, pb
    put true into ret
    put "|align left|alignleft|align center|aligncenter|" into keys
    if key is in keys then
        domenu_exitifcompatmodeenabled
        if "left" is in pl then put "left" into direction
        else put "center" into direction
        if "setAll|" is in pb then
            replace "setAll|" with "" in pb
            set the textalign of pb to direction
        else
            set the textalign of the selectedfield to direction
        end if
        return true
    else
        return false
    end if
end domenu_changefontalign

on domenu_exitifcompatmodeenabled
    if the compatibilitymode of this stack then
        answer "Please turn off compatibilitymode before doing this."
        exit to ViperCard
    end if
end domenu_exitifcompatmodeenabled
       `.replace(/\r\n/g, '\n')
};
