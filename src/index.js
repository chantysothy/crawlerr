"use strict";

const extend  = require( "extend.js" );
const Queue   = require( "./queue" );
const Sitemap = require( "./sitemap" );
const Request = require( "./router/request" );

/**
 * Crawler class.
 *
 * @author    Łaniewski Bartosz <laniewski.bartozzz@gmail.com> (//laniewski.me)
 * @copyright Copyright (c) 2016 Łaniewski Bartosz
 * @license   MIT
 */

class Crawler {
    /**
     * Creates a new `Crawler` instance with custom options.
     *
     * @param   object  options
     * @param   int     options.concurrency
     * @param   int     options.interval
     * @access  public
     */
    constructor( options ) {
        this.options = extend( {
            concurrency : 10,
            interval    : 250,
            verbose     : true
        }, options );

        this.queue = new Queue( this.options );
    }

    /**
     * Automatically starts the queue. Requests a `url` and executes the
     * specified `callback`.
     *
     * @async
     * @param   string      url
     * @param   function    callback
     * @access  public
     */
    get( url, callback ) {
        this.queue.start();
        this.queue.set( () => new Request( url, ( res ) => callback( res ) ) );
    }

    /**
     * Scans a `website` and executes a `callback` when the scan is completed.
     *
     * @async
     * @param   string      website
     * @param   function    callback
     * @access  public
     */
    scan( website, callback ) {
        let scanner = new Sitemap( website, this.options );

        scanner.on( "end", links => callback( links ) );
    }
};

module.exports = Crawler;