$(function(){

    let win_pattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];

    function min_max (simulTable){
        for (let i = 0; i < simulTable.length; i++){
            if (simulTable[i] == -1){
                simulTable[i] = 1
                setWinner("1", simulTable)
                simulTable[i] = -1
            }
        }
    }

    function minmax_table (){
        let simulTable = []
        $('td').each(function(index, element){
            if($(element).hasClass("symbole_0")){
                simulTable.push(0)
            }
            else if ($(element).hasClass("symbole_1")){
                simulTable.push(1)
            }
            else{
                simulTable.push(-1)
            }


        })
        return min_max(simulTable)
    }


    function setWinner (symbole, array){

        let index_table = [];
        $.each(array, function(index, element){
            if ($(element).hasClass("symbole_" + symbole)){
                index_table.push(index);
            }
        });
        console.log(index_table)




        let hasWin = false;
        $.each(win_pattern, function (index, element){
            let upTo3 = 0;
            $.each(element, function (win_nmbr, test_elem){
                if($.inArray(test_elem, index_table) != -1){
                    upTo3++;
                    console.log(upTo3)
                    if (upTo3 == 3){
                        hasWin = true;
                    }
                }
            });

        });
        console.log(hasWin)
        return hasWin;

    }
    $('table').css({"float":"left", "margin-right":"20px"})
    let turn = true;
    let nb_turn = 0;
    let vsIA = false;
    $('body').append("<form id='game_mode'></form>")
    $('#game_mode').append("<input type='submit' value='" + ((!vsIA) ? "Jouer contre IA" : "Jouer à 2") + "' style='width: 150px; height: 30px' id='game_mode_button'>").click(function(){
        vsIA = !vsIA
        $('#game_mode_button').attr('value', ((!vsIA) ? "Jouer contre IA" : "Jouer à 2"))
    })
    $("body").append("<h3></h3>")
    $('body').append("<form id='replay_form'></form>")
    $("form").on("submit", function (e){
        e.preventDefault()
    })
    $("h3").html("Tour des " + ((turn) ? "ronds" : "croix"))

    //Début du script
    $('td').click(function () {



        if (!$(this).hasClass("symbole_0") && !$(this).hasClass("symbole_1") && !$(this).hasClass("end"))
        {
            $("h3").html("Tour des " + ((turn) ? "croix" : "ronds")).css({"color":"black", "font-size":"19px"})

            $(this).addClass("symbole_" + ((turn) ? "0" : "1"));
            nb_turn++

            let td_table = [];
            $('td').each(function(index, element){
                if ($(element).hasClass("symbole_" + ((turn) ? "0" : "1"))) {
                    td_table.push(element);
                }
            });
            $.each(td_table, function (index, element){
                console.log(index)
            })
            console.log(td_table)

            if (nb_turn >= 5) {
                if (setWinner((turn) ? "0" : "1"), td_table) {
                    $("h3").html("Les " + ((turn) ? "ronds" : "croix") + " ont gagné").css({"color":"red", "font-size":"25px"})
                    $("td").addClass("end")
                    $('#replay_form').append("<input type='submit' value='Replay' id='Replay' style='height:50px; width:100px; font-size: 20px'>")
                    $('#Replay').click(function (){
                        $("h3").html("Tour des " + ((turn) ? "ronds" : "croix")).css({"color":"black", "font-size":"19px"})
                        $('td').removeClass("symbole_0 symbole_1 end")
                        nb_turn = 0;
                        (this).remove()
                    })


                }
                else if (nb_turn == 9){
                    $("h3").html("Égalité").css({"color":"red", "font-size":"25px"});
                    $("td").addClass("end")
                    $('#replay_form').append("<input type='submit' value='Replay' id='Replay' style='height:50px; width:100px; font-size: 20px'>")
                    $('#Replay').click(function (){
                        $("h3").html("Tour des " + ((turn) ? "ronds" : "croix")).css({"color":"black", "font-size":"19px"})
                        $('td').removeClass("symbole_0 symbole_1 end")
                        nb_turn = 0;
                        (this).remove()
                    })

                }
            }


            turn = !turn;

        }

    });

});