# reusable-toolbar

Inputs:
title: string,
showSearchBar: boolean,
searchPlaceholder: string,
handleSearch: function,

Output:
Creates a toolbar and fires a custom event on search.

Example Usage:

1. Toolbar without SearchField:
   <nine-toolbar 
       title="Title of toolbar" 
       showSearchBar="false">
   </nine-toolbar>

2. Toolbar with a searchField:
   <nine-toolbar 
        title="Title of toolbar" 
        showSearchBar="true" 
        searchPlaceholder="Enter Placeholder" 
        handle-search="handleSearch(event)">
   </nine-toolbar>
