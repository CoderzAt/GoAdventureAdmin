import React, { Component } from 'react';

export  class indexbar extends Component
    {
        render(){
        return(
            <div class="page-header">
            <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                    <i class="mdi mdi-wan"></i>
                </span> Country
            </h3>
            <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Country
                    </li>
                </ul>
            </nav>
        </div>
        )
        }
    }

    export default indexbar
    