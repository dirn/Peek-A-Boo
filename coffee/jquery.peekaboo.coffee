root = this
$ = jQuery

$.fn.extend({
  peekaboo: (options) ->
    $this = $ this

    # Initialize variables used to prevent hiding caption after a return hover
    active_item = null
    hover_active = false

    # If the option is a string, it is the caption selector
    if typeof options == 'string'
      options =
        caption: options

    settings = $.extend({
        caption: '.peekaboo' # Caption selector
        delay: 500 # Delay before hiding
        opacity: 0.4 # Opacity of the caption overlay
        padding: 0 # Pad the caption and its overlay
        speedOut: 'normal' # Hide speed
        speedOver: 'fast' # Show speed
        wrapperClass: 'peekaboo-wrapper' # Call to assign to the caption's wrapper element
    }, options)

    # Ceate the overlay, ...
    $overlay = $('<div/>')
        # assign the class, ...
        .addClass(settings.wrapperClass)
        # style it, ...
        .css({
            background: '#000'
            opacity: settings.opacity
            padding: settings.padding
            position: 'absolute'
            top: $this.height()
            zIndex: 100
        })
        # and insert it before the caption
        .insertBefore $this.find settings.caption

    # Calculate the width of the overlay ...
    width = $this.width()
    # adjusting for any padding ...
    if $overlay.css 'padding-left'
        width -= parseInt $overlay.css 'padding-left'
    if $overlay.css 'padding-right'
        width -= parseInt $overlay.css 'padding-right'
    # and set it
    $overlay.css {
        width: width
    }

    # Make sure the parent has a relative position. This restricts the
    # absolute positioning of the overlay and caption.
    $this.css {
        position: 'relative'
    }

    # Find the caption ...
    $this.find(settings.caption)
        # and style it
        .css {
            padding: settings.padding
            position: 'absolute'
            top: $this.height()
            width: width
            zIndex: 200
        }

    # Create the function to hide the caption
    hide_function = ->
        # hover_active will be true if the mouse is placed over the caption
        # after the timeout has been started for hide_function.
        if hover_active
            return

        $active_item = $ active_item

        # Assign the height of the parent element to create a slide down effect.
        top =  $active_item.height()
        $active_item.find(settings.caption).animate {top: top}, settings.speedOut
        $active_item.find('.' + settings.wrapperClass).animate {top: top}, settings.speedOut

    $this.hover(
        ->
            # Capture the instance
            $this = $ this

            # Set hover_active = true to prevent hiding
            hover_active = true
            # Capture the active item, this is needed for hiding later
            active_item = this

            $caption = $this.find settings.caption

            # Get the height of the caption ...
            caption_height = $caption.innerHeight()
            # and substract it from the height of the parent to get the
            # position of the caption
            top = $this.height() - caption_height

            # Assign the position to create a slide up effect. Aslo set the
            # height of the overlay to match the height of the caption.
            $this.find('.' + settings.wrapperClass).height(caption_height).animate {top: top}, settings.speedOver
            $this.find(settings.caption).animate {top: top}, settings.speedOver
        ->
            # Clear the hover_active flag to allow the caption to hide
            hover_active = false
            # Start the timeout for hide_function
            window.setTimeout hide_function, settings.delay
    )
})
