import React, {useEffect} from 'react';

export default function Info({updateColors}) {
    useEffect(()=>updateColors(), []);
    return (
        <div className="container main-text-color">
            <div className="row justify-content-center">
                <div className="col-sm-11">
                    <h4>How To Use</h4>
                    <hr />
                    <p className="secondary-text-color">Fill in the input fields with what you would like to search for. You do not need to complete all
                the fields, but the more options you select, the more narrow the search results will be.</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-11">
                    <h4>FAQ</h4>
                    <hr />
                    <b>Who has the most clout?</b>
                    <p className="secondary-text-color">Mr. Zotistics</p>

                    <b>How far does the data go back to?</b>
                    <p className="secondary-text-color">Summer 2014</p>

                    <b>How often will grades be added and updated?</b>
                    <p className="secondary-text-color">New grades will be added once the data is available after the quarter is over, which can take a few weeks.</p>

                    <b>Why are the +/- grades not shown?</b>
                    <p className="secondary-text-color">That's how the data was given to me.</p>

                    <b>What does <u>Exclude P/NP</u> do?</b>
                    <p className="secondary-text-color">It excludes classes that grade in only Pass/No Pass from the search result.</p>

                    <b>What does <u>Exclude COVID-19</u> do?</b>
                    <p className="secondary-text-color">It excludes Winter 2020 and Spring 2020 from the search result.</p>

                    <b>How did you get the data?</b>
                    <p className="secondary-text-color">I made a <a href="https://en.wikipedia.org/wiki/California_Public_Records_Act">California Public
                Records Act</a> request to <a href="http://www.pro.uci.edu">UCI's Public Records Office</a>.</p>

                    <b>Why can't I find a certain class?</b>
                    <p className="secondary-text-color">UCI might be withholding that class's data, or the instructor may have submitted grades late so the
                    data wasn't collected. It could also just be a bug; if you think this is the case, submit a bug report
                <a href="https://forms.gle/eoWtS26Ys8ra4cjK8">here.</a></p>

                    <b>I <i>really</i> want to know the missing class grade distribution, is there anything you can do?</b>
                    <p className="secondary-text-color">Submit a request <a href="https://forms.gle/eoWtS26Ys8ra4cjK8">here,</a> and I may be able to pull
                some strings and add it to the database.</p>

                    <b>Why can't I find a certain instructor?</b>
                    <p className="mb-0">There are 3 possible reasons:</p>
                    <ol>
                        <li>If they are a professor/lecturer, it may be for the same reasons as <i>"Why can't I find a certain class?"</i> above.</li>
                        <li>If they are a TA, they may not be listed in the database, or the professor is listed instead of the TA.</li>
                        <li>If the class has multiple instructors, only one teacher may have been mentioned in the database.</li>
                    </ol>

                    <b>Is the data perfect?</b>
                    <p className="secondary-text-color">Almost. The database I received from UCI is contained in a badly formatted Excel file. Although I
                    did my best to fix a lot of the issues, there were some things that could not be fixed, and I had
                    to make some decisions to salvage parts of the database. For example, the instructor listed in the
                    database sometimes differed from the instructor listed for the same class on WebSoc. To solve this
                    issue, I decided to use the names listed in the database, as there are too many uncertainties that
                    go with using the name listed on WebSoc.</p>

                    <b>I can view the Writing TAs. Why not others?</b>
                    <p className="secondary-text-color">I made an exception for the writing classes to use the instructor listed on WebSoc because it's
                    standard for TAs to be teaching most of these writing classes.</p>

                    <b>Why is it called Zotistics?</b>
                    <p className="secondary-text-color">Zot + Statistics</p>

                    <b>Why are there dogs on the homepage?</b>
                    <p className="secondary-text-color">I like dogs.</p>

                    <b>I love this website so much! Can I donate?</b>
                    <p className="secondary-text-color">Yes! You can donate <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E5G2Z2F2FCXYL&source=url">here</a>.
                I accept Discord Nitro as well if you can find me on there :waveboy:</p>

                    <h5>Upcoming Features:</h5>
                    <ul className="mb-1">
                        <li>Dark Theme</li>
                        <li>Search by distribution</li>
                    </ul>
                    <p className="secondary-text-color"><i>Release Date: Soon<sup>TM</sup></i></p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-11">
                    <h4>Changelog</h4>
                    <hr />

                    <b>October 13, 2020</b>
                    <ul>
                        <li>Updated Info page</li>
                    </ul>

                    <b>August 31, 2020</b>
                    <ul>
                        <li>Updated Info page</li>
                        <li>Performance update</li>
                    </ul>

                    <b>August 13, 2020</b>
                    <ul>
                        <li>Added Info page</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}