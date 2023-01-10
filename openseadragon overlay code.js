
            var chronicling_america_example = function( sequence ){
                return function(level, column, row){
                    var px = 0;
                    if (column !== 0) {
                        px = this.getTileWidth() * column - this.tileOverlap;
                    }
                    var py = 0;
                    if (row !== 0) {
                        py = this.getTileHeight() * row - this.tileOverlap;
                    }
                    var scale = this.getLevelScale(level);
                    var dimensionsScaled = this.dimensions.times(scale);

                    // find the dimension of the tile, adjust for no
                    // overlap data on top and left edges
                    var sx = this.getTileWidth() +
                            (column === 0 ? 1 : 2) * this.tileOverlap;
                    var sy = this.getTileHeight() +
                        (row === 0 ? 1 : 2) * this.tileOverlap;

                    // adjust size for single-tile levels where the image
                    // size is smaller than the regular tile size, and for
                    // tiles on the bottom and right edges that would
                    // exceed the image bounds.
                    sx = Math.min(sx, dimensionsScaled.x - px);
                    sy = Math.min(sy, dimensionsScaled.y - py);

                    var tile_width = parseInt(sx);
                    var tile_height = parseInt(sy);

                    var x1 = parseInt(px / scale);
                    var y1 = parseInt(py / scale);
                    var x2 = parseInt((px + sx) / scale);
                    var y2 = parseInt((py + sy) / scale);

                    return 'http://chroniclingamerica.loc.gov/lccn/sn85066387/1898-01-09/ed-1/seq-' +
                        sequence + '/' +
                        'image_' + tile_width + 'x' + tile_height +
                        '_from_' + x1 + ',' + y1 +
                        '_to_' + x2 + ',' + y2 + '.jpg';
                };
            };

            OpenSeadragon({
                id:            "example-tilesource-overlay",
                prefixUrl:     "/openseadragon/images/",
                sequenceMode: true,
                tileSources: [{
                    minLevel: 8,
                    width: 6425,
                    height: 8535,
                    tileSize: 256,
                    tileOverlap: 1,
                    overlays: [{
                        id: 'example-overlay',
                        x: 0.33,
                        y: 0.75,
                        width: 0.2,
                        height: 0.25,
                        className: 'highlight'
                    }],
                    getTileUrl: chronicling_america_example(17)
                },{
                    minLevel: 8,
                    width: 6425,
                    height: 8535,
                    tileSize: 256,
                    tileOverlap: 1,
                    getTileUrl: chronicling_america_example(18)
                }],
                onPageChange: function() {
                    //Tooltips
                    setTimeout(bindtooltip, 2000);
                }
            });

            jQuery(function() {
                //Tooltips
                setTimeout(bindtooltip, 2000);
            });

            function bindtooltip(){
                var tip = jQuery('#example-tip');
                jQuery("#example-overlay").hover(function(e){
                    var mousex = e.pageX + 20, //Get X coordinates
                        mousey = e.pageY + 20, //Get Y coordinates
                        tipWidth = tip.width(), //Find width of tooltip
                        tipHeight = tip.height(), //Find height of tooltip

                    //Distance of element from the right edge of viewport
                        tipVisX = $(window).width() - (mousex + tipWidth),
                    //Distance of element from the bottom of viewport
                        tipVisY = $(window).height() - (mousey + tipHeight);

                    if ( tipVisX < 20 ) { //If tooltip exceeds the X coordinate of viewport
                        mousex = e.pageX - tipWidth - 20;
                    } if ( tipVisY < 20 ) { //If tooltip exceeds the Y coordinate of viewport
                        mousey = e.pageY - tipHeight - 20;
                    }
                    tip.css({  top: mousey, left: mousex, position: 'absolute' });
                    tip.show().css({opacity: 0.8}); //Show tooltip
                }, function() {
                    tip.hide(); //Hide tooltip
                });
            };
        