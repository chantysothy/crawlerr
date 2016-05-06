"use strict";

const Crawler = require( "./../src" );
const Colors  = require( "colors" );

const Spider = new Crawler( {
    concurrency : 5,
    interval    : 200,
    verbose     : true
} );

Spider.allow( "http://blog.npmjs.org/page/" );
Spider.allow( "http://blog.npmjs.org/ask/" );

Spider.scan( "http://blog.npmjs.org/", ( links ) => {
    links.filter( "http://blog.npmjs.org/page/[digit]", ( results ) => {
        for ( let page of results ) {
            Spider.get( page, function ( response ) {
                let $    = response.html;
                let data = response.data;

                $( "#posts .post .caption.group h2 a" ).each( ( i, node ) => {
                    if ( $( node ).text() ) {
                        console.log( `${$( node ).text()}`.italic.magenta );
                    }
                } );
            } );
        }
    } );
} );
