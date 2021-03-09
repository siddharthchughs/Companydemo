package ai.a2i2.surveyjstheming;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.res.AssetManager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ArrayList <String> itemList = new ArrayList<>();

        SurveyArrayAdapter surveyArrayAdapter = new SurveyArrayAdapter(R.layout.list_item, itemList);
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.survey_list);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setAdapter(surveyArrayAdapter);

        AssetManager manager = getAssets();
        try {
            String[] surveyFiles = manager.list("SURVEYS");
            Collections.addAll(itemList, surveyFiles);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    private void createSurveyDialog(final FragmentManager fragmentManager, String surveyJson) {
        final SurveyDialogFragment dialog = SurveyDialogFragment.newInstance(surveyJson);
        if (dialog != null) {
            dialog.show(fragmentManager, dialog.getTag());
        }
    }

    public class SurveyArrayAdapter extends RecyclerView.Adapter<SurveyArrayAdapter.ViewHolder> {

        //All methods in this adapter are required for a bare minimum recyclerview adapter
        private int listItemLayout;
        private ArrayList<String> itemList;
        // Constructor of the class
        public SurveyArrayAdapter(int layoutId, ArrayList<String> itemList) {
            listItemLayout = layoutId;
            this.itemList = itemList;
        }

        @Override
        public int getItemCount() {
            return itemList == null ? 0 : itemList.size();
        }

        @NonNull
        @Override
        public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(listItemLayout, parent, false);
            return new ViewHolder(view);
        }

        @Override
        public void onBindViewHolder(final ViewHolder holder, final int listPosition) {
            TextView item = holder.item;
            item.setText(itemList.get(listPosition));
        }

        class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
            public TextView item;
            public ViewHolder(View itemView) {
                super(itemView);
                itemView.setOnClickListener(this);
                item = (TextView) itemView.findViewById(R.id.row_item);
            }

            @Override
            public void onClick(View view) {
                // Load the survey file content as a String and launch the survey dialog
                try {
                    InputStream inputStream = getApplicationContext().getAssets().open("SURVEYS/" + item.getText());
                    StringBuilder textBuilder = new StringBuilder();
                    try (Reader reader = new BufferedReader(new InputStreamReader
                            (inputStream, Charset.forName(StandardCharsets.UTF_8.name())))) {
                        int c = 0;
                        while ((c = reader.read()) != -1) {
                            textBuilder.append((char) c);
                        }
                    }
                    createSurveyDialog(getSupportFragmentManager(), textBuilder.toString());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}