<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Laravel\Ui\Presets\React;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }

    public function index()
    {
        $articles = Article::all();

        return $articles->toJson();
    }

    public function search(Request $request)
    {
        $search = $request->search;

        $posts = '';

        if (trim($request->search)) {
            $posts = Article::where('title', 'LIKE', "%{$search}%")
                ->orderBy('created_at', 'DESC')->limit(5)->get();
        }

        return $posts;
    }


    public function store(Request $request)
    {
        $rules = [
            'title' => 'required',
            'content' => 'required',
            'image' => 'required'
        ];

        $customMessages = [
            'required' => 'Input :attribute tidak boleh kosong',
        ];
        $this->validate($request, $rules, $customMessages);
        $picture = '';
        if ($request->hasFile('image')) {
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = date('His') . '-' . $filename;
            $file->move(public_path('uploads'), $picture);
        } else {
            return response()->json(["message" => "Select image first.", "request" => $request]);
        }

        Article::create([
            'title' => $request->input('title'),
            'slug' => Str::of($request->input('title'))->slug('-'),
            'content' => $request->input('content'),
            'image' => $picture,
        ]);


        return response()->json([
            'success' => true,
            'message' => 'Article created successfully!'
        ], 201);
    }

    public function getArticle($slug) // for edit and show
    {
        $article = Article::with(['comments.child.child'])->where('slug', $slug)->first();
        return $article->toJson();
    }
    public function comment(Request $request)
    {
        $rules = [
            'email' => 'required|email:rfc,dns',
            'username' => 'required',
            'comment' => 'required'
        ];

        $customMessages = [
            'required' => 'Input :attribute tidak boleh kosong',
            'email' => 'Alamat email tidak valid'
        ];

        $this->validate($request, $rules, $customMessages);

        Comment::create([
            'article_id' => $request->id,
            'parent_id' => $request->parent_id != '' ? $request->parent_id : NULL,
            'email' => $request->email,
            'username' => $request->username,
            'comment' => $request->comment
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Comment created successfully!'
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $article = Article::find($id);
        $article->title = $validatedData['title'];
        $article->content = $validatedData['content'];
        $article->save();

        $msg = [
            'success' => true,
            'message' => 'Article updated successfully'
        ];

        return response()->json($msg);
    }

    public function delete($id)
    {
        $article = Article::find($id);
        if (!empty($article)) {
            $article->delete();
            $msg = [
                'success' => true,
                'message' => 'Article deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Article deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
