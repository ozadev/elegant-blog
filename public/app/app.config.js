
(function () {
    'use strict';

    // angular.module('blogApp').config([
    //     '$rootScope',
    //     function ($rootScope) {
    //
    //     }
    // ]);

    angular.module('blogApp').config(['$provide',
        function($provide) {
            $provide.decorator('taOptions', ['taRegisterTool', '$delegate',
                function(taRegisterTool, taOptions) {
                    // $delegate is the taOptions we are decorating
                    // here we override the default toolbars specified in taOptions.
                    taOptions.toolbar = [
                        ['clear', 'h1', 'h2', 'h3'],
                        ['ul', 'ol'],
                        ['bold', 'italics'],
                        ['insertLink', 'insertVideo']
                    ];

                    taOptions.disableSanitizer = true;

                    // Create our own insertImage button
                    taRegisterTool('customHTML', {
                        iconclass: "fa fa-picture-o",
                        action: function() {
                            var textAngular = this;
                            var savedSelection = rangy.saveSelection();
                            rangy.restoreSelection(savedSelection);
                            textAngular.$editor().wrapSelection('insertHTML', '<span style="color: red">U</span>', true);

                            return false;
                        },
                    });

                    // Now add the button to the default toolbar definition
                    // Note: It'll be the last button
                    taOptions.toolbar[3].push('customHTML');
                    return taOptions;
                }
            ]);
        }
    ]);

})();

