package ai.a2i2.surveyjstheming;

import android.content.Intent;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    // The Conductor platform provides the path to the intervention module html via the
    // RecommendationContent.contents variable. The following list is ONLY used for this application.
    public static final Map<String, String> INTERVENTION_LIST = new HashMap<String, String>() {
        {
            put("Sleep - Module 1", "/sleep/module-1/index.html");
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.item_list);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setAdapter(new SurveyArrayAdapter(R.layout.list_item, getSurveyItemList()));

        BottomNavigationView bottomNavigationView = (BottomNavigationView) findViewById(R.id.bottom_nav);
        bottomNavigationView.setOnNavigationItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.surveys_item) {
                recyclerView.setAdapter(new SurveyArrayAdapter(R.layout.list_item, getSurveyItemList()));
                return true;
            } else if (id == R.id.interventions_item) {
                recyclerView.setAdapter(new InterventionArrayAdapter(R.layout.list_item, getInterventionItemList()));
                return true;
            }
            return false;
        });
    }

    private ArrayList<String> getSurveyItemList() {
        ArrayList<String> itemList = new ArrayList<>();
        AssetManager manager = getAssets();
        try {
            String[] surveyFiles = manager.list("SurveyJS/Files");
            Collections.addAll(itemList, surveyFiles);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return itemList;
    }

    private ArrayList<String> getInterventionItemList() {
        ArrayList<String> itemList = new ArrayList<>();
        INTERVENTION_LIST.forEach((key, value) -> {
            itemList.add(key);
        });
        return itemList;
    }

    @Override
    protected void onResume() {
        super.onResume();
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

            private void createSurveyDialog(final FragmentManager fragmentManager, String surveyJson) {
                final SurveyDialogFragment dialog = SurveyDialogFragment.newInstance(surveyJson);
                if (dialog != null) {
                    dialog.show(fragmentManager, dialog.getTag());
                }
            }

            @Override
            public void onClick(View view) {
                // Load the survey file content as a String and launch the survey dialog
                try {
                    InputStream inputStream = getApplicationContext().getAssets().open("SurveyJS/Files/" + item.getText());
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

    public class InterventionArrayAdapter extends RecyclerView.Adapter<InterventionArrayAdapter.ViewHolder> {

        //All methods in this adapter are required for a bare minimum recyclerview adapter
        private final int listItemLayout;
        private final ArrayList<String> itemList;

        // Constructor of the class
        public InterventionArrayAdapter(int layoutId, ArrayList<String> itemList) {
            listItemLayout = layoutId;
            this.itemList = itemList;
        }

        @Override
        public int getItemCount() {
            return itemList == null ? 0 : itemList.size();
        }

        @NonNull
        @Override
        public InterventionArrayAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(listItemLayout, parent, false);
            return new InterventionArrayAdapter.ViewHolder(view);
        }

        @Override
        public void onBindViewHolder(final InterventionArrayAdapter.ViewHolder holder, final int listPosition) {
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
                Intent intent = new Intent(view.getContext(), InterventionActivity.class);
                intent.putExtra("INTERVENTION", item.getText());
                startActivity(intent);
            }
        }
    }
}