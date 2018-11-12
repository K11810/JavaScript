// $(document).ready(function()は、$(function(){});と同義。

// readyメソッドは、DOM（htmlの構成要素）がすべて読み込まれた（操作可能になった）時にこのfunctionを実行する。
$(document).ready(function(){
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。

	// htmlのid="national_language"などから、.valによってvalueの値を取得。
	// 取得した値を、Number()によって数値に変換。
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];

    // 教科数
    const subject_number = subject_points.length;

    // さらにこのような記述をすることで、「合計点：」となっている右の部分に合計点が出力される

	// 上記で配列として取得した各教科の数値を、一つずつ変数sumに加算している。
    let sum = subject_points[0];
    sum = sum + subject_points[1];
    sum = sum + subject_points[2];
    sum = sum + subject_points[3];
    sum = sum + subject_points[4];

  	// 各教科の平均点
  	let avg = sum / subject_number;

	// .text()は、要素内のテキスト文字列を設定する。
	// htmlにあるid="sum_indicate"が付いたlabelタグに、各教科の合計(sum)を設定する。

    $("#sum_indicate").text(sum);

    // ここに、上記を参考にして平均点を出力する処理を書き込む
    $("#avarage_indicate").text(avg);

  // この関数内で定義した関数・定数を戻り値に設定。
    return [subject_points, sum, avg];
  }

  function get_achievement(){
    let [subject_points, sum, avg] = score_indicate();

    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let rank;

  	if (avg >= 80){
	    rank = "A";
	  } else if (avg >= 60){
	    rank = "B";
  	} else if (avg >= 40){
	    rank = "C";
	  } else {
	    rank = "D";
  	}
    $("#evaluation").text(rank);
    return rank;
  }

  function get_pass_or_failure(){
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let [subject_points, sum, avg] = score_indicate();
    let number = subject_points.length;
    let judge_pass_or_failure = "合格";

    for(let i=0; i<number; i++) {
      if (subject_points[i] < 60) {
        judge_pass_or_failure = "不合格";
        break;
      }
    }
  $("#judge").text(judge_pass_or_failure);
  return judge_pass_or_failure;
  }


  function judgement(){
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績は（ここに「ランク」の値を入れる）です。（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。
    let achievement = get_achievement();
    let pass_or_failure = get_pass_or_failure();
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}です。${pass_or_failure}です</label>`);
  }


	// 国語・英語・数学・理科・社会のどれかの点数の内容が変更されたら、５つの教科の合計点と平均点を出力する機能
  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
  });


  $('#btn-evaluation').click(function() {
    get_achievement();
  });

  $('#btn-judge').click(function() {
    get_pass_or_failure();
  });

  $('#btn-declaration').click(function() {
    judgement();
  });
  
});


